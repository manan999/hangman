import { useState, useEffect, useRef, useContext } from 'react' ;
import {  Vibration, Dimensions, ToastAndroid } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import valid from 'validator' ;

import { Cross } from '../../comps/icons.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;
import { MainView, AlphaRow, WordView, CrossView, CrossCon, GameText, GuesserView, TimerText, HintHead, HintText, HintView, GameHeader, ScoreHead, ScoreText, ScoreView, GameHeaderRight, GameHeaderLeft, IconButton } from './cssGameScreen.js' ;
import { Alpha, Letter } from './AlphaLetter.js' ;
import { Gem } from '../../comps/icons.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import hurray from '../../../assets/hurray.json' ;
import red from '../../../assets/red.json' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const Game = ({movie, round, next, hint, config, mode}) => {
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
		return movie.toLowerCase().split(' ').map( (one, i) => {
			return (
				<WordView key={i}>
					{	one.split('').map((two,i) => {
							return <Letter key={i} text={returnLetter(two)} /> ;
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
			return <IconButton onPress={onHintPress}><MaterialIcons name="lightbulb" size={32} color="yellow" /><ScoreHead><Gem size={13}/>&nbsp;10</ScoreHead></IconButton> ;
		else
			return <IconButton onPress={onHintPress}><MaterialIcons name="lightbulb" size={32} color="yellow" /></IconButton> ;
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
			return <IconButton onPress={onAddTimePress}><MaterialIcons name="more-time" size={32} color="white" /><ScoreHead><Gem size={13}/>&nbsp;20</ScoreHead></IconButton> ;
	}

	const returnCountDown = () => {
		if(mode !== 'practice')
			return (
				<AnimateView>
			    	<CountdownCircleTimer isPlaying={!wait} duration={time} colors={['#FFFFFF', '#f55442']} colorsTime={[30, 0]} trailColor="#1d2951" onComplete={()=>next('Loss', wrong, hintCount)} size={90} strokeWidth={8}>
					    {({ remainingTime }) => <Animatable.View animation="rubberBand" iterationCount="infinite" ><TimerText>{remainingTime}</TimerText></Animatable.View>}
					</CountdownCircleTimer>
				</AnimateView>
			) ;
	}

	const returnGems = () => {
		if(mode !== 'practice')
			return <ScoreHead><Gem size={15}/>&nbsp;{gems}</ScoreHead> ;
	}

	return (
	    <MainView>
        	<LottieView ref={gameRef} style={{height: windowHeight, position: 'absolute', top: 0}} source={hurray} loop={false} />
        	<LottieView ref={heartRef} style={{height: windowHeight, position: 'absolute', top: 0}} source={red} loop={false} progress={0.02} />
			<GameHeader>
				<GameHeaderLeft>
			    	{ returnGems() }
					<ScoreView>
						<ScoreHead>Score</ScoreHead>
						<ScoreText>{config.score}</ScoreText>
					</ScoreView>
			    </GameHeaderLeft>
	    		<AnimateView>
	    			<GameHeaderRight>
		    			{ returnHintButton() }
		    			{ returnAddTimeButton() }
	    			</GameHeaderRight>
	    		</AnimateView>
			</GameHeader>
	    	<CrossView>{[4,3,2,1,0].map(one =><CrossCon key={one}><Cross color={one>=wrong}/></CrossCon>)}</CrossView>
	    	{returnCountDown()}
	    	<Animatable.View key={round+1} iterationCount={3} animation="bounce">
	    		<GameText> Movies : Round {round+1} </GameText>
	    	</Animatable.View>
	    	<GuesserView>
			  	<AnimateView><AlphaRow>{returnGuesser()}</AlphaRow></AnimateView>
			  	<AnimateView> 
			  		<HintView>
				  		<HintHead> Hints : </HintHead>
				  		<HintText>{hint.join(', ')}</HintText>
				  	</HintView>
			    </AnimateView>
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