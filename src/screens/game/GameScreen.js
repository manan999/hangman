import { useState, useEffect } from 'react' ;
import { Text, View, Pressable, Vibration } from 'react-native';
import { ActivityIndicator } from 'react-native-paper' ;
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import Cross from '../../comps/icons/Cross.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;
import {MainView, AlphaRow, WordView, CrossView, CrossCon, GameText, GuesserView, 
		TimerText, HintHead, HintText, HintView, GameHeader, ScoreHead, ScoreText, ScoreView} from './cssGameScreen.js' ;
import {Alpha, Letter} from './AlphaLetter.js' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const Game = ({movie, round, next, hint, config, mode}) => {
	const [guessed, setGuessed] = useState(config.initGuess) ;
	const [details, setDetails] = useState({}) ;
	const [wrong, setWrong] = useState(0) ;
	const [hintCount, setHintCount] = useState(1) ;
	const [correct, setCorrect] = useState(0) ;
	const [time, setTime] = useState(config.startTime) ;
	const [wait, setWait] = useState(true) ;

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
				if(details[l]) 
					setCorrect(correct+details[l]) ;
				else
					if(wrong < 5)
						setWrong(wrong+1) ;
					else {
						Vibration.vibrate(200) ;
						next('Loss') ;
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

	const returnHintButton = () => {
		if(hintCount && hintCount < 3)
			return <Pressable onPress={() => setHintCount(hintCount+1)}><MaterialIcons name="lightbulb" size={36} color="yellow" /></Pressable> ;
		else
			return <MaterialIcons name="lightbulb" size={36} color="grey" /> ;
	}

	const returnCountDown = () => {
		if(mode !== 'practice')
			return (
				<AnimateView>
			    	<CountdownCircleTimer isPlaying={!wait} duration={time} colors={['#FFFFFF', '#f55442']} colorsTime={[30, 0]} trailColor="#1d2951" onComplete={()=>next('Loss')} size={90} strokeWidth={8}>
					    {({ remainingTime }) => <Animatable.View animation="rubberBand" iterationCount="infinite" ><TimerText>{remainingTime}</TimerText></Animatable.View>}
					</CountdownCircleTimer>
				</AnimateView>
			) ;
	}

	return (
	    <MainView>
			<GameHeader>
				<ScoreView><ScoreHead>Score :</ScoreHead><ScoreText>{config.score}</ScoreText></ScoreView>
	    		<AnimateView>{returnHintButton()}</AnimateView>
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
				  		<HintText>{hint.slice(0, hintCount).join(', ')}</HintText>
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

const GameScreen = ({navigation, route}) => {
	const [currentRound, setCurrentRound] = useState(0) ;
	const [movies, setMovies] = useState([]) ;
	const [movie, setMovie] = useState('') ;
	const [winCount, setWinCount] = useState(0) ;

	const {mode} = route.params ;

	useEffect( ()=> {
		if(currentRound % 10 === 8 || movies.length === 0) {
			fetch(`https://web.myarthhardware.com/movie`)
			.then(res => {
				if(res.ok)
					return res.json() ;
				throw Error(res.statusText) ;
			})
			.then( data => setMovies([...movies, ...data]) ) 
			.catch( err  => console.log(err) ) ;
		}
	}, [currentRound])

	useEffect( () => {
		if(movies.length > 0 ) {
			setMovie(movies[currentRound].name) ;
		}
	}, [currentRound, movies])

	const next = (str, num = 0, hintCount) => {
		if(mode === 'practice') {
			if(str === 'Win') { 
				setWinCount(winCount+1) ;
				setCurrentRound(currentRound+1) ;
			}
			else 
				navigation.replace('Result', {rounds: 20*(1+(winCount/20)), winCount }) ; 
		}
		else {
			if(str === 'Win') {
				hintCount -= 1 ;
				setWinCount(winCount+(20-(2*num)-(3*hintCount))) ;	
				setCurrentRound(currentRound+1) ;
			}		
			else
				navigation.replace('Score', {rounds: currentRound+1, score: winCount })
		} 
	}

	const returnTimeGuess = () => {
		if(currentRound < 10)
			return {startTime : 60, initGuess : ['a','e','i','o','u']} ;
		else if(currentRound < 15)
			return {startTime : 60, initGuess : ['a','e','i','o']} ;
		else if(currentRound < 20)
			return {startTime : 50, initGuess : ['a','e','i']} ;
		else if(currentRound < 25)
			return {startTime : 50, initGuess : ['a','e']} ;
		else if(currentRound < 30)
			return {startTime : 40, initGuess : ['a']} ;
		else
			return {startTime : 30, initGuess : []} ;
	}

	if(movies.length > 0) {
		const gameProps = {
			movie, next, mode,
			hint: movies[currentRound].hints,
			config: {
				score: winCount,
				...returnTimeGuess()
			}
		}
	  	return <Game key={currentRound} round={currentRound} {...gameProps}/> ;
	}
	else
		return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView> ;
}

export default GameScreen ;