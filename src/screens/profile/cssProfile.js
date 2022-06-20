import styled from 'styled-components/native' ;
import { View } from 'react-native';

import {MainView, KufamText, Row } from '../../../cssApp.js' ;
import {theme} from '../../theme.js' ;

const MainView2 = styled(MainView)` 
  justify-content: space-evenly ;
` ;

const ProfileView = styled.View`
  flex: .9 ;
  padding: 10px 20px ;
  margin: 20px 0 ;
  justify-content: space-evenly ;
  background-color: ${ ({theme}) => theme.colors.halfMain } ;
  width: 100% ;
` ;

const ProfileText = styled(KufamText)`
  margin: 0 ;
` ;

const MarginRow = styled(Row)`
  margin: 15px ; 
` ;

export {ProfileText, ProfileView, MarginRow, MainView2} ;