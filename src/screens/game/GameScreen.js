import { useState, useEffect, useCallback, useContext } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper' ;
import { BackHandler } from 'react-native' ;

import { MainView, GreenButton } from './cssGameScreen.js' ;
import { BlackKufam } from '../../../cssApp.js' ;
import Game from './Game.js' ;
import Popup from '../../comps/popup/Popup.js' ;
import {topicData} from './topicData.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { BackPop, RevivePop } from './gamePopups.js' ;

const initGame = {
	wins: 0,
	hints: 0,
	wrongs: 0,
	revive: false,
}

const GameScreen = ({navigation, route}) => {
	const [currentRound, setCurrentRound] = useState(0) ;
	const [data, setData] = useState([]) ;
	const [movie, setMovie] = useState('') ;
	const [gameData, setGameData] = useState(initGame) ;
	const [popOpen, setPopOpen] = useState(false) ;
	const [popContent, setPopContent] = useState('back') ;

    const {topics, fetchUrl} = useContext(UserContext) ;
	const {mode, topic} = route.params ;

	useFocusEffect(
	    useCallback(() => {
	    	const onBackPress = () => {
	    		if(popOpen && popContent === 'revive') {
	    			navigation.replace('Result', {rounds: currentRound+1, wins, hints, wrongs, topic, mode }) ;
	    			return true ;
	    		}
	    		else {
	    			setPopContent('back') ;
		        	setPopOpen(true) ;
		          	return true;
	    		}
	      	};

	      	BackHandler.addEventListener('hardwareBackPress', onBackPress);
	      	return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	    }, [popOpen, setPopOpen])
	);

	useEffect( ()=> {
		if(topics[topic] && (currentRound % 10 >= 8 || data.length === 0)) {
			let URL = `${fetchUrl}${topics[topic].url}?stage=${currentRound}` ;
			// console.log(URL) ;

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
			setMovie(data[currentRound].name) ;
		}
	}, [currentRound, data])

	const next = (str, num = 0, hintCount) => {
		const {wins, hints, wrongs } = gameData ;
		if(str === 'Win') {
			if(mode === 'practice') 
				setGameData({...gameData, wins: wins+1, wrongs: wrongs+num, hints: (hints-1)+hintCount}) ;
			else {
				hintCount -= 1 ;
				setGameData({...gameData, wins: wins+(20-(2*num)-(3*hintCount)), wrongs: wrongs+num, hints: hints+hintCount}) ;
			}
			setCurrentRound(currentRound+1) ;
		}
		else {
			if(gameData.revive)
				navigation.replace('Result', {rounds: currentRound+1, wins, hints, wrongs, topic, mode }) ;
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
			return topicData[topics[topic].timeLogic](currentRound) ;
	}

	if(data.length > 0) {
		const {wins, hints, wrongs, revive } = gameData ;

		const gameProps = {
			movie, next, mode, topic,
			hint: data[currentRound].hints,
			config: {
				score: wins,
				revive,
				...returnTimeGuess()
			}
		}

		const popContents = {
	        back: <BackPop onPress={() => navigation.replace('Result', {rounds: currentRound+1, wins, hints, wrongs, topic, mode })} />,
	        revive: <RevivePop onYesPress={() => {
	        	setGameData({...gameData, revive: true}) ;
	        	setPopOpen(false) ;
	        }} onNoPress={() => navigation.replace('Result', {rounds: currentRound+1, wins, hints, wrongs, topic, mode }) }/>,
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