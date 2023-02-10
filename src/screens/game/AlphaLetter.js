import { Pressable } from 'react-native';

import {AlphaView, AlphaText, LetterView, LetterText} from './cssAlpha.js' ;

const Alpha = ({text, guess, guessed, color, correct, initial}) => {
	const onAlphaPress = () => {
		if(!guessed) 
			guess(text)
	}

	return (
		<Pressable onPress={color?()=>{}:onAlphaPress}>
			<AlphaView guessed={guessed} color={color} correct={correct} initial={initial}>
				<AlphaText>{text}</AlphaText>
			</AlphaView>
		</Pressable>
	) ;
}

const Letter = ({text, color=false, size = 24}) => {
	return (
		<LetterView><LetterText size={size} color={color}>{text}</LetterText></LetterView>
	) ;
}

export {Alpha, Letter}