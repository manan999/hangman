import { useState, useEffect } from 'react' ;
import { ActivityIndicator } from 'react-native-paper' ;

import {MainView} from './cssGameScreen.js' ;
import Game from './Game.js' ;

const initGame = {
	wins: 0,
	hints: 0,
	wrongs: 0,
}

const GameScreen = ({navigation, route}) => {
	const [currentRound, setCurrentRound] = useState(0) ;
	const [movies, setMovies] = useState([]) ;
	const [movie, setMovie] = useState('') ;
	const [gameData, setGameData] = useState(initGame) ;

	const {mode} = route.params ;

	useEffect( ()=> {
		if(currentRound % 10 === 8 || movies.length === 0) {
			fetch(`https://web.myarthhardware.com/movie`)
			// fetch(`http://192.168.1.8:8000/movie`)
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
		const {wins, hints, wrongs } = gameData ;
		if(mode === 'practice') {
			if(str === 'Win') { 
				setGameData({wins: wins+1, wrongs: wrongs+num, hints: (hints-1)+hintCount}) ;
				setCurrentRound(currentRound+1) ;
			}
			else 
				navigation.replace('Result', {rounds: 10*(1+Math.floor(wins/10)), wins, hints, wrongs, topic: 'Movies', mode: 'Practice' }) ; 
		}
		else {
			if(str === 'Win') {
				hintCount -= 1 ;
				setGameData({wins: wins+(20-(2*num)-(3*hintCount)), wrongs: wrongs+num, hints: hints+hintCount}) ;
				setCurrentRound(currentRound+1) ;
			}		
			else
				navigation.replace('Score', {rounds: currentRound+1, score: wins, hints, wrongs })
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
				score: gameData.wins,
				...returnTimeGuess()
			}
		}
	  	return <Game key={currentRound} round={currentRound} {...gameProps}/> ;
	}
	else
		return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView> ;
}

export default GameScreen ;