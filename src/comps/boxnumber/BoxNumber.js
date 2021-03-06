import { View, Text } from 'react-native' ;
import styled from 'styled-components/native' ;

import {theme} from '../../theme.js' ;

const BoxNumberView = styled.View`
	padding: 25px 0 15px;
` ;

const NumText = styled.Text` 
	background-color: ${({bgColor}) => bgColor} ;
	color: ${({theme}) => theme.colors.main} ;
	border-radius: 10px ;
	padding: 3px ;
	font-family: ${({theme}) => theme.fonts.main} ;
	text-align: center ;
	font-size: 24px ;
` ;

const ColorText = styled.Text`
	font-family: ${({theme}) => theme.fonts.main} ;
	color : ${({textColor}) => textColor} ;
	margin: 5px 0 0 0 ;
` ;

const BoxNumber = ({num, text, color=theme.colors.white}) => {
	return (
		<BoxNumberView>
			<NumText bgColor={color}> {num} </NumText>
			<ColorText textColor={color}> {text} </ColorText>
		</BoxNumberView>
	) ;
}

export default BoxNumber ;