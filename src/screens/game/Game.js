import { useState, useEffect, useRef, useContext, Fragment } from 'react' ;
import {  Vibration, Dimensions, ToastAndroid, Image, Pressable, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import valid from 'validator' ;

import { Cross } from '../../comps/icons.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;
import HintImage from './hintImage/HintImage.js' ;
import { MainView, AlphaRow, WordView, CrossCon, GameText, GuesserView, TimerText, HintHead, GameHeader, ScoreHead, ScoreText, HeaderChild } from './cssGameScreen.js' ;
import { Row } from '../../../cssApp.js' ; 
import { Alpha, Letter } from './AlphaLetter.js' ;
import { Gem } from '../../comps/icons.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import hurray from '../../../assets/hurray.json' ;
import red from '../../../assets/red.json' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const Game = ({movie, round, next, hint, config, mode, topic}) => {
	const [guessed, setGuessed] = useState(config.initGuess) ;
	const [details, setDetails] = useState({}) ;
	const [wrong, setWrong] = useState(0) ;
	const [hintCount, setHintCount] = useState(1) ;
	const [correct, setCorrect] = useState(0) ;
	const [time, setTime] = useState(config.startTime) ;
	const [eta, setEta] = useState(config.startTime) ;
	const [wait, setWait] = useState(true) ;
    const windowHeight = Dimensions.get('window').height;

    const {gems, addGems} = useContext(UserContext) ;

    let gameRef = useRef(null)
    let heartRef = useRef(null)

	useEffect(() => {
	  const timer = setTimeout(() => setWait(false), 2000);
	  return () => clearTimeout(timer);
	}, [wait]);

	useEffect( () => {
		let obj = {} ;
		movie.toLowerCase().split('').forEach(l => {
			if(obj[l])
				obj[l] += 1 ; 
			else
				obj[l] = 1 ;
		})
		setDetails(obj) ;
		setTime(config.startTime) ;
		setWrong(0) ;
		setCorrect(0) ;
		setWait(true) ;
		setHintCount(1) ;
		setGuessed(config.initGuess) ;
	}, [movie])

	useEffect( () => {
		if(movie.length>0 && movie.toLowerCase().split('').filter(c=>(c.toLowerCase()>='a'&&c.toLowerCase()<='z')).every(v => guessed.includes(v))) {
			next('Win', wrong, hintCount) ;
		}
	}, [correct])

	useEffect( () => {
		if(guessed !== config.initGuess) {
			let l = guessed.slice(-1)[0] ;
			if(l) {
				if(details[l]) {
					setCorrect(correct+details[l]) ;
					gameRef.current.play() ;
					Vibration.vibrate(25) ;
				}
				else
					if(wrong < 5) {
						setWrong(wrong+1) ;
						gameRef.current.reset() ;
						heartRef.current.play(0, 30) ;
						Vibration.vibrate(100) ;
					}
					else {
						Vibration.vibrate(500) ;
						next('Loss', wrong, hintCount) ;
					}
			}
		}
	}, [guessed])

	const returnLetter = (str) => {
		if(str.toLowerCase() >= 'a' && str.toLowerCase() <= 'z')
			return (guessed.includes(str))?str:'_' ;
		else
			return str ;
	}

	const returnGuesser = () => {
		// return 'The Accidental Prime Minister'.toLowerCase().split(' ').map( (one, i) => {
		return movie.toLowerCase().split(' ').map( (one, i) => {
			return (
				<WordView key={i}>
					{	one.split('').map((two,i) => {
							return <Letter key={i} text={returnLetter(two)} size={one.length>10?20:24}/> ;
					    }) 
					}
				</WordView>
			) ;
		}) ;
	}

	const onHintPress = () => {
		let hints = Object.keys(details).sort((one, two)=>details[one]-details[two]).filter(one => valid.isAlpha(one) && !guessed.includes(one) ) ;

		if(hints.length > 0) {
			// console.log(hints) ;
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

	const returnAddTimeButton = () => {
		if(mode !== 'practice')
			return <Pressable onPress={onAddTimePress}><MaterialIcons name="more-time" size={32} color="white" /><ScoreHead><Gem size={13}/>&nbsp;20</ScoreHead></Pressable> ;
	}

	const returnCountDown = () => {
		if(mode !== 'practice')
			return (
				<AnimateView>
			    	<CountdownCircleTimer isPlaying={/*false*/!wait} duration={time} colors={['#FFFFFF', '#f55442']} colorsTime={[30, 0]} trailColor="#1d2951" onComplete={()=>next('Loss', wrong, hintCount)} size={80} strokeWidth={8}>
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
				  		<HintHead> Hints </HintHead>
				  		<Row>
				  			{hint.map((one,i)=><Fragment key={i}><HintImage topic={topic.toLowerCase()} name={(one+'').toLowerCase()} /></Fragment>)}
				  		</Row>
			  		</View>
			  	</>
			) ;
		else if (hint.length === 1)  
			return (
				<>
				  	<HintImage topic={topic.toLowerCase()} name={(hint[0]+'').toLowerCase()} />
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
		    		{returnCountDown()}
		    	</HeaderChild>
	    		<AnimateView>
	    			<HeaderChild>
		    			{ returnHintButton() }
		    			{ returnAddTimeButton() }
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
		      			}} guessed={guessed.includes(two)}/>)}
		      		</AlphaRow>)
		      	} 
	      	</AnimateView>
	    </MainView>
  	) ;
}

export default Game ;