import {useState, useEffect} from 'react' ;
import { Text, View, Pressable, Vibration } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import * as Animatable from 'react-native-animatable';

import Cross from '../../comps/icons/Cross.js' ;
import {MainView, AlphaRow, AlphaView, AlphaText, LetterView, LetterText, WordView, 
				CrossView, CrossCon, GameText, GuesserView, TimerText} from './cssGameScreen.js' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const movies = ['3 Idiots', 'Kabhi Khushi Kabhi Gham', 'Heropanti', 'Mujhse Shaadi Karogi ?', 'Once Upon A Time in Mumbai Dobaara', 'Matru ki Bijlee ka Mandola', 'Mere Brother ki Dulhan', 'Mughal-e-Azam', 'Love Story 1950', 'Lagaan']

const Alpha = ({text, guess, guessed}) => {
	const onAlphaPress = () => {
		if(!guessed) {
			guess(text)
			Vibration.vibrate(25) ;
		}
	}

	return (
		<Pressable onPress={onAlphaPress}>
			<AlphaView guessed={guessed}><AlphaText>{text}</AlphaText></AlphaView>
		</Pressable>
	) ;
}

const Letter = ({text}) => {
	return (
		<LetterView><LetterText>{text}</LetterText></LetterView>
	) ;
}

const Game = ({movie, round, next}) => {
	const [guessed, setGuessed] = useState([]) ;
	const [details, setDetails] = useState({}) ;
	const [wrong, setWrong] = useState(0) ;
	const [correct, setCorrect] = useState(0) ;
	const [time, setTime] = useState(30) ;

	useEffect( () => {
		let obj = {} ;
		movie.toLowerCase().split('').forEach(l => {
			if(obj[l])
				obj[l] += 1 ; 
			else
				obj[l] = 1 ;
		})
		setDetails(obj) ;
		setTime(30) ;
		setWrong(0) ;
		setCorrect(0) ;
		setGuessed([]) ;
	}, [movie])

	useEffect( () => {
		if(wrong === 5) 
			next('Loss') ;
	}, [wrong])

	useEffect( () => {
		if(movie.length>0 && movie.split('').filter(c=>(c.toLowerCase()>='a'&&c.toLowerCase()<='z')).length === correct) 
			next('Win') ;
	}, [correct])

	useEffect( () => {
		let l = guessed.slice(-1)[0] ;
		if(l) {
			if(details[l]) 
				setCorrect(correct+details[l]) ;
			else
				setWrong(wrong+1) ;
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

	return (
    <MainView>
    	<CrossView>
    		{Array.from(new Array(wrong)).map((one, i)=><CrossCon key={i}><Cross/></CrossCon>)}
    	</CrossView>
    	<CountdownCircleTimer isPlaying duration={time} colors={['#FFFFFF', '#f55442']} colorsTime={[30, 0]} trailColor="#1d2951" onComplete={()=>next('Loss')} size={100} strokeWidth={8}>
		    {({ remainingTime }) => <Animatable.View animation="rubberBand" iterationCount="infinite" ><TimerText>{remainingTime}</TimerText></Animatable.View>}
		  </CountdownCircleTimer>
    	<GameText> Round {round+1} : Guess the Movie </GameText>
    	<GuesserView><AlphaRow>{returnGuesser()}</AlphaRow></GuesserView>
      <View> 
      	{	alphas.map( (one,i) => <AlphaRow key={i}>
      			{one.split('').map(two=><Alpha key={two} text={two} guess={(str) => setGuessed([...guessed, str])} guessed={guessed.includes(two)}/>)}
      		</AlphaRow>)
      	} 
      </View>
    </MainView>
  ) ;
}

const GameScreen = ({navigation, route}) => {
	const [currentRound, setCurrentRound] = useState(0) ;
	const [movie, setMovie] = useState('') ;
	const [winCount, setWinCount] = useState(0) ;

	const {rounds} = route.params ;

	useEffect( () => {
		if(currentRound < rounds)
			setMovie(movies[currentRound]) ;
	}, [currentRound])

	const next = (str) => {
		console.log(str, 'str', currentRound, 'currentRound', rounds, 'rounds') ;
		if(currentRound+1 !== rounds) {
			console.log('if true') ;
			if(str === 'Win')
				setWinCount(winCount+1) ;
			setCurrentRound(currentRound+1)
		}
		else {
			console.log('if false') ;
			navigation.navigate('Loss') ; 
		}
	}

  return (
    <Game key={currentRound} round={currentRound} movie={movie} next={next}/>
  ) ;
}

export default GameScreen ;