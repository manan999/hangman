import styled from 'styled-components/native' ;
import { View } from 'react-native';

import {MainView, KufamText, Row } from '../../../cssApp.js' ;
import {theme} from '../../theme.js' ;

const MainView2 = styled(MainView)` 
  justify-content: space-evenly ;
` ;

const ProfileView = styled.View`
  flex: ${({fl}) => fl?fl:0.9} ;
  padding: 10px 20px ;
  margin: 0 ;
  justify-content: space-evenly ;
  background-color: ${ ({theme}) => theme.colors.halfMain } ;
  width: 100% ;
` ;

const ProfileText = styled(KufamText)`
  margin: 0 ;
  text-align: center ;
` ;

const DisplayText = styled(KufamText)`
  margin-top: 0px ;
  margin-bottom: 0px ;
  text-align: center ;
  text-transform: ${({tt}) => tt?'capitalize':'none'} ;
` ;

const MarginRow = styled(Row)`
  margin: 15px ; 
` ;

export {ProfileText, ProfileView, MarginRow, MainView2, DisplayText} ;