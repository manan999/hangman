import { useState, useEffect, useCallback } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper' ;
import { ToastAndroid, BackHandler, Modal } from 'react-native' ;

import { MainView, GreenButton } from './cssGameScreen.js' ;
import { BlackKufam } from '../../../cssApp.js' ;
import Game from './Game.js' ;
import Popup from '../../comps/popup/Popup.js' ;

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
	const [popOpen, setPopOpen] = useState(false) ;

	const {mode} = route.params ;

	useFocusEffect(
	    useCallback(() => {
	    	const onBackPress = () => {
	        	// ToastAndroid.show("Back Button is disabled on this screen", ToastAndroid.SHORT) ;
	        	setPopOpen(true) ;
	          	return true;
	      	};

	      	BackHandler.addEventListener('hardwareBackPress', onBackPress);
	      	return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	    }, [popOpen, setPopOpen])
	);

	useEffect( ()=> {
		if(currentRound % 10 === 8 || movies.length === 0) {
			fetch(`https://web.myarthhardware.com/movie`)
			// fetch(`http://localhost:8000/movie`)
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
				navigation.replace('Result', {rounds: currentRound+1, wins, hints, wrongs, topic: 'Movies', mode: 'practice' }) ; 
		}
		else {
			if(str === 'Win') {
				hintCount -= 1 ;
				setGameData({wins: wins+(20-(2*num)-(3*hintCount)), wrongs: wrongs+num, hints: hints+hintCount}) ;
				setCurrentRound(currentRound+1) ;
			}		
			else
				navigation.replace('Result', {rounds: currentRound+1, wins, hints, wrongs, topic: 'Movies', mode: 'challenge' })
		} 
	}

	const returnTimeGuess = () => {
		if(mode === 'practice')
			return {initGuess : ['a','e','i','o','u']} ;
		else {
			if(currentRound < 10)
				return {startTime : 45, initGuess : ['a','e','i','o','u']} ;
			else if(currentRound < 15)
				return {startTime : 45, initGuess : ['a','e','i','o']} ;
			else if(currentRound < 20)
				return {startTime : 30, initGuess : ['a','e','i']} ;
			else if(currentRound < 25)
				return {startTime : 30, initGuess : ['a','e']} ;
			else if(currentRound < 30)
				return {startTime : 20, initGuess : ['a']} ;
			else
				return {startTime : 20, initGuess : []} ;
		}
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
	  	return (
	  		<>
	  			<Popup visible={popOpen} onClose={() => setPopOpen(false)}>
	  				<BlackKufam size={20}> Exit this Game ? </BlackKufam>
	  				<GreenButton dark={false} icon="check" mode="contained" onPress={() => navigation.replace('Home')}> Yes </GreenButton>
	  			</Popup>
	  			<Game key={currentRound} round={currentRound} {...gameProps}/> 
	  		</>
	  	) ;
	}
	else
		return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView> ;
}

export default GameScreen ;