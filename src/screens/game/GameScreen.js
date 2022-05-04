import {useState, useEffect} from 'react' ;
import { Text, View, Pressable, Vibration } from 'react-native';

import Cross from '../../comps/icons/Cross.js' ;
import {MainView, AlphaRow, AlphaView, AlphaText, LetterView, LetterText, WordView, 
				CrossView, CrossCon, GameText} from './cssGameScreen.js' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const movie = "Hum Dil De Chuke Sanam" ;

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

const GameScreen = ({navigation}) => {
	const [guessed, setGuessed] = useState([]) ;
	const [details, setDetails] = useState({}) ;
	const [wrong, setWrong] = useState(0) ;
	const [correct, setCorrect] = useState(0) ;

	useEffect( () => {
		let obj = {} ;
		movie.toLowerCase().split('').forEach(l => {
			if(obj[l])
				obj[l] += 1 ; 
			else
				obj[l] = 1 ;
		})
		setDetails(obj) ;
	}, [movie])

	useEffect( () => {
		if(wrong === 3) 
			navigation.replace('Loss') ;
		else if(movie.split('').filter(c=>(c.toLowerCase()>='a'&&c.toLowerCase()<='z')).length === correct) 
			navigation.replace('Win') ;
	}, [wrong, correct])

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
    	<GameText> Guess the Movie </GameText>
    	<View><AlphaRow>{returnGuesser()}</AlphaRow></View>
      <View> 
      	{	alphas.map( (one,i) => <AlphaRow key={i}>
      			{one.split('').map(two=><Alpha key={two} text={two} guess={(str) => setGuessed([...guessed, str])} guessed={guessed.includes(two)}/>)}
      		</AlphaRow>)
      	} 
      </View>
    </MainView>
  ) ;
}

export default GameScreen ;