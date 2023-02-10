import { useState, useEffect, useRef, useContext, Fragment } from 'react' ;
import {  Vibration, Dimensions, ToastAndroid, Image, Pressable, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import valid from 'validator' ;
import { Audio } from 'expo-av';

import { Cross } from '../../comps/icons.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;
import HintImage from './hintImage/HintImage.js' ;
import { MainView, AlphaRow, WordView, CrossCon, GameText, GuesserView, TimerText, HintHead, GameHeader, ScoreHead, ScoreText, HeaderChild } from './cssGameScreen.js' ;
import { KufamText, Row } from '../../../cssApp.js' ; 
import { Alpha, Letter } from './AlphaLetter.js' ;
import { Gem } from '../../comps/icons.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import hurray from '../../../assets/hurray.json' ;
import red from '../../../assets/red.json' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const Game = ({word, round, next, hint, config, mode, topic}) => {
	const [guessed, setGuessed] = useState(config.initGuess) ;
	const [details, setDetails] = useState({}) ;
	const [wrong, setWrong] = useState(0) ;
	const [hintCount, setHintCount] = useState(1) ;
	const [correct, setCorrect] = useState(0) ;
	const [time, setTime] = useState(config.startTime) ;
	const [timeKey, setTimeKey] = useState('') ;
	const [wait, setWait] = useState(true) ;
	const [color, setColor] = useState(false) ;

	const [sound, setSound] = useState();

    const {gems, addGems, settings} = useContext(UserContext) ;

    const windowHeight = Dimensions.get('window').height;

    let gameRef = useRef(null)
    let heartRef = useRef(null)

    useEffect(() => sound?()=>sound.unloadAsync():undefined, [sound]);

	useEffect(() => {
		// starts timer after waiting 2 seconds (for each word)
		const timer = setTimeout(() => setWait(false), 2000);
	  	return () => clearTimeout(timer);
	}, [wait]);

	const correctSound = async () => {
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/success.mp3') );
        setSound(sound);
        await sound.playAsync();
    }

    const wrongSound = async () => {
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/wrong.wav') );
        setSound(sound);
        await sound.playAsync();
    }

	useEffect( () => {
		// calculate no. of each letter in the word
		let obj = {} ;
		word.toLowerCase().split('').forEach(l => {
			if(obj[l])
				obj[l] += 1 ; 
			else
				obj[l] = 1 ;
		})
		setDetails(obj) ;
		
		// reset for a new word / or on revive
		setTime(config.startTime) ;
		setTimeKey(timeKey+'a') ;
		setWrong(0) ;
		setCorrect(0) ;
		setWait(true) ;
		setHintCount(1) ;
		setGuessed(config.initGuess) ;
	}, [config.revive, word])

	useEffect( () => {
		// checks if a single guess is right or wrong

		let timer ;
		if(guessed !== config.initGuess) {
			let l = guessed.slice(-1)[0] ;
			if(l) {
				if(details[l]) {
					setCorrect(correct+details[l]) ;
					if(settings && settings.sfx)
						correctSound() ;
					gameRef.current.play() ;
					Vibration.vibrate(25) ;
				}
				else
					if(wrong < 5) {
						setWrong(wrong+1) ;
						if(settings && settings.sfx)
							wrongSound() ;
						gameRef.current.reset() ;
						heartRef.current.play(0, 30) ;
						Vibration.vibrate(200) ;
					}
					else {
						Vibration.vibrate(500) ;
						setColor('tomato')
						timer = setTimeout( () => {
							setColor(false) ;
							next('Loss', wrong, hintCount) ;
						}, 2000)
					}
			}
		}
	  	return () => clearTimeout(timer);
	}, [guessed])

	useEffect( () => {
		// checks for a win on every correct guess
		
		let timer ;

		if(word.length>0 && word.toLowerCase().split('').filter(c=>(c.toLowerCase()>='a'&&c.toLowerCase()<='z')).every(v => guessed.includes(v))) {
			setColor('lime')
			timer = setTimeout( () => {
				setColor(false) ;
				next('Win', wrong, hintCount) ;
			}, 2000)
		}

	  	return () => clearTimeout(timer);
	}, [correct])

	const returnLetter = (str) => {
		if(str.toLowerCase() >= 'a' && str.toLowerCase() <= 'z')
			return (guessed.includes(str) || color)?str:'_' ;
		else
			return str ;
	}

	const returnGuesser = () => {
		// return 'saand ki aankh'.toLowerCase().split(' ').map( (one, i) => {
		return word.toLowerCase().split(' ').map( (one, i) => {
			return (
				<WordView key={i} wrap={one.length>10?'wrap':'nowrap'}>
					{	one.split('').map((two,i) => {
							return <Letter key={i} text={returnLetter(two)} size={one.length>10?20:24} color={color?color:''}/> ;
					    }) 
					}
				</WordView>
			) ;
		}) ;
	}

	const onHintPress = () => {
		let hints = Object.keys(details).sort((one, two)=>details[one]-details[two]).filter(one => valid.isAlpha(one) && !guessed.includes(one) ) ;

		if(hints.length > 0) {
			if(mode === 'practice') 
				if (hintCount < 4)
					setGuessed([...guessed, hints[0]]) ;
				else
        			ToastAndroid.show("No More Hints for this Word", ToastAndroid.SHORT)
			else
				if (gems > 9) {
					setGuessed([...guessed, hints[0]]) ;
					addGems(-10) ;
				}
				else
        			ToastAndroid.show("Not Enough Gems", ToastAndroid.SHORT)
		}
		setHintCount(hintCount+1) ;
	}

	const returnHintButton = () => {
		if(mode !== 'practice')
			return <Pressable onPress={onHintPress}><MaterialIcons name="lightbulb" size={32} color="yellow" /><ScoreHead><Gem size={13}/>&nbsp;10</ScoreHead></Pressable> ;
		else
			return <Pressable onPress={onHintPress}><MaterialIcons name="lightbulb" size={32} color="yellow" /></Pressable> ;
	}

	const onAddTimePress = () => {
		if(gems > 19) {
			setTime(time+15) ;
			addGems(-20) ;
		}
		else
    		ToastAndroid.show("Not Enough Gems", ToastAndroid.SHORT)
	}

	const addTimeButton = () => {
		if(mode !== 'practice')
			return <Pressable onPress={onAddTimePress}><MaterialIcons name="more-time" size={32} color="white" /><ScoreHead><Gem size={13}/>&nbsp;20</ScoreHead></Pressable> ;
	}

	const CountDown = () => {
		if(mode !== 'practice')
			return (
				<AnimateView>
			    	<CountdownCircleTimer key={timeKey} isPlaying={/*false*/!wait} duration={time} colors={['#FFFFFF', '#f55442']} colorsTime={[30, 0]} trailColor="#1d2951" onComplete={()=>{
			    		setColor('tomato')
						setTimeout( () => {
							setColor(false) ;
							next('Loss', wrong, hintCount) ;
						}, 2000)
			    	}} size={80} strokeWidth={8}>
					    {({ remainingTime }) => <Animatable.View animation="rubberBand" iterationCount="infinite" ><TimerText>{remainingTime}</TimerText></Animatable.View>}
					</CountdownCircleTimer>
				</AnimateView>
			) ;
	}

	const returnGems = () => {
		if(mode !== 'practice')
			return <ScoreHead><Gem size={15}/>&nbsp;{gems}</ScoreHead> ;
	}

	const returnLayout = () => {
		if(hint.length > 1)
			return (
				<>
					<AlphaRow>{returnGuesser()}</AlphaRow>
			  		<View>
				  		<HintHead> Hints <KufamText size={14}>(Touch to Enlarge)</KufamText> </HintHead>
				  		<Row>
				  			{hint.map((one,i)=><Fragment key={i}><HintImage topic={topic.toLowerCase()} name={(one+'').toLowerCase()} /></Fragment>)}
				  		</Row>
			  		</View>
			  	</>
			) ;
		else if (hint.length === 1)  
			return (
				<>
				  	<Row> 
				  		<HintImage topic={topic.toLowerCase()} name={(hint[0]+'').toLowerCase()} single/>
				  	</Row>
					<AlphaRow>{returnGuesser()}</AlphaRow>
			  	</>
			) ;
		else
			return (
				<>	<Text> Unable to Load Data </Text>	</>
			) ;
	}

	return (
	    <MainView>
        	<LottieView ref={gameRef} style={{height: windowHeight, position: 'absolute', top: 0}} source={hurray} loop={false} />
        	<LottieView ref={heartRef} style={{height: windowHeight, position: 'absolute', top: 0}} source={red} loop={false} progress={0.02} />
			<GameHeader>
	    		<AnimateView>
					<HeaderChild>
				    	{ returnGems() }
						<HeaderChild>
							<ScoreHead>Score</ScoreHead>
							<ScoreText>{config.score}</ScoreText>
						</HeaderChild>
				    </HeaderChild>
	    		</AnimateView>
				<HeaderChild>
	    			<AnimateView>
		    			<Row>
		    				{[4,3,2,1,0].map(one =><CrossCon key={one}><Cross color={one>=wrong}/></CrossCon>)}
		    			</Row>
	    			</AnimateView>
		    		{CountDown()}
		    	</HeaderChild>
	    		<AnimateView>
	    			<HeaderChild>
		    			{ returnHintButton() }
		    			{ addTimeButton() }
	    			</HeaderChild>
	    		</AnimateView>
			</GameHeader>
	    	<Animatable.View key={round+1} iterationCount={3} animation="bounce">
	    		<GameText> {topic} : Round {round+1} </GameText>
	    	</Animatable.View>
	    	<GuesserView>
			  	<Animatable.View animation='fadeIn' delay={1000} style={{ height: '100%', justifyContent: 'space-evenly'}}>
			  		{ returnLayout() }
			    </Animatable.View>
	      	</GuesserView>
	      	<AnimateView> 
		      	{	alphas.map( (one,i) => <AlphaRow key={i}>
		      			{one.split('').map(two=><Alpha key={two} text={two} guess={(str) => {
		      				if(!wait) setGuessed([...guessed, str]) ;
		      			}} initial={config.initGuess.includes(two)} guessed={guessed.includes(two)} color={color} correct={details[two]>0}/>)}
		      		</AlphaRow>)
		      	} 
	      	</AnimateView>
	    </MainView>
  	) ;
}

export default Game ;