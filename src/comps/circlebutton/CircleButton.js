import { TouchableOpacity } from 'react-native' ;
import styled from 'styled-components/native' ;

import {theme} from '../../theme.js' ;

const CircleOpacity = styled.TouchableOpacity`
	width: ${({size}) => size}px ; 
	height: ${({size}) => size}px ; 
	border-radius: ${({size}) => size/2}px ;
	
	background-color: ${({bgColor}) => bgColor} ;
	align-items: center ;
	justify-content: center ;
` ;

const CircleButton = ({children, size=50, bgColor=theme.colors.mainLight, onButtonPress}) => {
	return (
		<CircleOpacity size={size} onPress={onButtonPress} bgColor={bgColor}>
			{children}
		</CircleOpacity>
	) ;
}

export default CircleButton ;