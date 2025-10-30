import { useState, useEffect, useCallback, useContext } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper' ;
import { BackHandler } from 'react-native' ;

import { MainView } from './cssGameScreen.js' ;
import Game from './Game.js' ;
import Popup from '../../comps/popup/Popup.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { BackPop, RevivePop } from './gamePopups.js' ;

const timeLogic = (num) => {
	if(num < 10)
		return {startTime : 60, initGuess : ['a','e','i','o','u']} ;
	else if(num < 20)
		return {startTime : 50, initGuess : ['a','e','i','o']} ;
	else if(num < 30)
		return {startTime : 40, initGuess : ['a','e','i']} ;
	else if(num < 35)
		return {startTime : 30, initGuess : ['a','e']} ;
	else if(num < 40)
		return {startTime : 20, initGuess : ['a']} ;
	else
		return {startTime : 15, initGuess : []} ;
}

const initGame = {
	wins: 0,
	revive: false,
}

const GameScreen = ({navigation, route}) => {
	const [popOpen, setPopOpen] = useState(false) ;
	const [popContent, setPopContent] = useState('back') ;
	
	const [data, setData] = useState([]) ;
	const [currentRound, setCurrentRound] = useState(0) ;
	const [word, setWord] = useState('') ;
	const [gameData, setGameData] = useState(initGame) ;

    const {topics, fetchUrl} = useContext(UserContext) ;
	const {mode, topic} = route.params ;

	useFocusEffect(
	    useCallback(() => {
	    	const onBackPress = () => {
	    		if(popOpen && popContent === 'revive') {
	    			navigation.replace('Result', {rounds: currentRound+1, wins: gameData.wins, topic, mode }) ;
	    			return true ;
	    		}
	    		else {
	    			setPopContent('back') ;
		        	setPopOpen(true) ;
		          	return true;
	    		}
	      	};

			const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
	    }, [popOpen, setPopOpen])
	);

	useEffect( ()=> {
		if(topics[topic] && (currentRound % 50 >= 48 || data.length === 0)) {
			const URL = `${fetchUrl}${topics[topic].url}?stage=${currentRound}` ;

			fetch(URL)
			.then(res => {
				if(res.ok)
					return res.json() ;
				throw Error(res.statusText) ;
			})
			.then( resp => setData([...data, ...resp]) ) 
			.catch( err  => console.log(err) ) ;
		}
	}, [currentRound, topics])

	useEffect( () => {
		if(data.length > 0 ) {
			setWord(data[currentRound].name) ;
		}
	}, [currentRound, data])

	const next = (str, num = 0, hintCount) => {
		const {wins} = gameData ;
		if(str === 'Win') {
			if(mode === 'practice') 
				setGameData({...gameData, wins: wins+1 }) ;
			else {
				hintCount -= 1 ;
				setGameData({...gameData, wins: wins+(20-(2*num)-(3*hintCount)) }) ;
			}
			setCurrentRound(currentRound+1) ;
		}
		else {
			if(gameData.revive)
				navigation.replace('Result', {rounds: currentRound+1, wins, topic, mode }) ;
			else {
				setPopContent('revive') ;
				setPopOpen(true) ;
			}
		}		
	}

	const returnTimeGuess = () => {
		if(mode === 'practice')
			return {initGuess : ['a','e','i','o','u']} ;
		else 
			return timeLogic(currentRound) ;
	}

	if(data.length > 0) {
		const {wins, revive} = gameData ;

		const gameProps = {
			word, next, mode, topic,
			hint: data[currentRound].hints,
			config: {
				score: wins,
				revive,
				...returnTimeGuess()
			}
		}

		const popContents = {
	        back: <BackPop onPress={() => navigation.replace('Result', {rounds: currentRound+1, wins, topic, mode })} />,
	        revive: <RevivePop onYesPress={() => {
	        	setGameData({...gameData, revive: true}) ;
	        	setPopOpen(false) ;
	        }} onNoPress={() => navigation.replace('Result', {rounds: currentRound+1, wins, topic, mode }) }/>,
	    }
		
	  	return (
	  		<>
	  			<Popup visible={popOpen} close={popContent==='back'} onClose={() => {
	  				if(popContent==='back')
	  					setPopOpen(false) ;
	  			}}>{popContents[popContent]}</Popup>
	  			<Game key={currentRound} round={currentRound} {...gameProps}/> 
	  		</>
	  	) ;
	}
	else
		return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView> ;
}

export default GameScreen ;