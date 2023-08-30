import styled from 'styled-components/native' ;

import {MainView, KufamText, Row } from '../../../cssApp.js' ;

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
  margin: 0 30px ;
  text-align: center ;
  text-transform: ${({tt}) => tt?'capitalize':'none'} ;
` ;

const MarginRow = styled(Row)`
  margin: 15px ; 
` ;

const ProfileTop = styled.View`
  padding: 30px 20px ;
  margin: 0 ;
  align-items: center ;
  width: 100% ;
` ;

export {ProfileText, ProfileView, MarginRow, MainView2, DisplayText, ProfileTop} ;