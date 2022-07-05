import styled from 'styled-components/native' ;
import { View } from 'react-native';
import {MainScrollView, KufamText} from '../../../cssApp.js' ;
import {HomeImage } from '../home/cssHomeScreen.js' ;


import {theme} from '../../theme.js' ;

const LogoView = styled.View`
	padding: 20px 0 ;
` ;

const AboutView = styled(MainScrollView)` 
	padding: 1px 20px ;
	background-color: ${ ({theme}) => theme.colors.halfMain } ;
` ;

const LogoImage = styled(HomeImage)`
  max-width: 340px ;
  height: 60px ; 
` ;

const AboutText = styled(KufamText)`
  text-align: justify ;
` ;

export {AboutView, LogoImage, LogoView, AboutText} ;