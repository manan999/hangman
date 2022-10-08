import { Pressable } from 'react-native';

import {AlphaView, AlphaText, LetterView, LetterText} from './cssAlpha.js' ;

const Alpha = ({text, guess, guessed}) => {
	const onAlphaPress = () => {
		if(!guessed) 
			guess(text)
	}

	return (
		<Pressable onPress={onAlphaPress}>
			<AlphaView guessed={guessed}><AlphaText>{text}</AlphaText></AlphaView>
		</Pressable>
	) ;
}

const Letter = ({text, color=false, size = 24}) => {
	return (
		<LetterView><LetterText size={size} color={color}>{text}</LetterText></LetterView>
	) ;
}

export {Alpha, Letter}