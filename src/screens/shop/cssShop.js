import styled from 'styled-components/native' ;

import { P } from '@comps' ;

const ChestCon = styled.View` 
	margin: 0 ;
	align-items: center ;
 ` ;

const ShopText = styled(P)` 
	background-color: ${ ({theme}) => theme.colors.quarterBlack } ;
	align-self: stretch ;
	padding-top: 10px ;
 ` ;

const AvatarPackView = styled.View` 
	flex-direction: row ;
	flex-wrap: wrap ;
 ` ;

export { ChestCon, ShopText, AvatarPackView} ;