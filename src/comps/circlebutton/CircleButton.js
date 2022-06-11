import { TouchableOpacity, Text } from 'react-native' ;
import styled from 'styled-components/native' ;

import {theme} from '../../theme.js' ;

const CircleOpacity = styled.TouchableOpacity`
	width: ${({size}) => size}px ; 
	height: ${({size}) => size}px ; 
	border-radius: ${({size}) => size/2}px ;
	
	background-color: ${({theme}) => theme.colors.mainLight} ;
	align-items: center ;
	justify-content: center ;
` ;

const CircleButton = ({children, size=50, onButtonPress}) => {
	return (
		<CircleOpacity size={size} onPress={onButtonPress}>
			{children}
		</CircleOpacity>
	) ;
}

export default CircleButton ;