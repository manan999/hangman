import styled from 'styled-components/native' ;
import { CountUp } from 'use-count-up' ;

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
			<NumText bgColor={color}> <CountUp isCounting end={num} duration={2} /> </NumText>
			<ColorText textColor={color}> {text} </ColorText>
		</BoxNumberView>
	) ;
}

export default BoxNumber ;