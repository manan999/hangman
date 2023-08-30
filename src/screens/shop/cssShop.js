import styled from 'styled-components/native' ;

import { KufamText } from '../../../cssApp.js' ;

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

export { ChestCon, ShopText, AvatarPackView} ;