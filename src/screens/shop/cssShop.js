import styled from 'styled-components/native' ;
import { Image } from 'react-native';

import { KufamText, WhiteButton } from '../../../cssApp.js' ;
import { theme } from '../../theme.js' ;

const GemChest = styled.Image` 
	resize-mode: contain ;
	width: 250px ;
	height: 200px ;
	margin-bottom: 20px ;
 ` ;

const ChestCon = styled.View` 
	margin: 20px 0 ;
	align-items: center ;
 ` ;

export {GemChest, ChestCon} ;