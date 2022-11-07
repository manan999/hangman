import { View, Modal } from 'react-native' ;
import styled from 'styled-components/native' ;
import { Entypo } from '@expo/vector-icons'; 

import { theme } from '../../theme.js' ;
import CircleButton from '../../comps/circlebutton/CircleButton.js' ;

const CenterView = styled.View`
	flex: 1 ;
	align-items: center ;
	justify-content: center ;
	background-color: ${({theme}) => theme.colors.halfBlack} ;
` ;

const WhiteView = styled.View`
	align-items: center ;
	justify-content: center ;
	background-color: ${({theme}) => theme.colors.white} ;
	margin: 20px ;
	padding: ${({thin}) => thin?`35px 10px`:'35px'} ;
	border-radius: 20px ;
	elevation: 5 ;
	position: relative ;
` ;

const CrossView = styled.View` 
	position: absolute ;
	top: 5px  ;
	right: 5px  ;
` ;

const Popup = ({visible, onClose, children, thin=false}) => {
	return (
		<Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
	        <CenterView>
	        	<WhiteView thin={thin}>
		            {children}
		            <CrossView>
			            <CircleButton size={35} onButtonPress={onClose} bgColor={theme.colors.white}>
			            	<Entypo name="circle-with-cross" size={35} color={theme.colors.darkRed} />
			            </CircleButton>
			        </CrossView>
		        </WhiteView>
	        </CenterView>
	    </Modal>
	) ;
}

export default Popup ;