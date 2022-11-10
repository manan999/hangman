import styled from 'styled-components/native' ;
import { Image } from 'react-native';

import { KufamText } from '../../../cssApp.js' ;
import { theme } from '../../theme.js' ;

const GemChest = styled.Image` 
	resize-mode: contain ;
	width: 250px ;
	height: 200px ;
	margin-bottom: 20px ;
 ` ;

const ChestCon = styled.View` 
	margin: 0 ;
	align-items: center ;
 ` ;

const ShopText = styled(KufamText)` 
	margin: 0 ;
	background-color: ${ ({theme}) => theme.colors.quarterBlack } ;
	align-self: stretch ;
	text-align: center ;
	padding-top: 10px ;
 ` ;

const AvatarPackView = styled.View` 
	flex-direction: row ;
	flex-wrap: wrap ;
 ` ;

export {GemChest, ChestCon, ShopText, AvatarPackView} ;