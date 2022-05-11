import { Pressable, Vibration } from 'react-native';

import {AlphaView, AlphaText, LetterView, LetterText} from './cssAlpha.js' ;

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

export {Alpha, Letter}