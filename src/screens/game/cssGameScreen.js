import styled from 'styled-components/native' ;
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: space-evenly ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
  position: relative
` ;

const AlphaRow = styled.View` 
  flex-direction: row ;
  justify-content: center ;
  flex-wrap: wrap ;
` ;

const GuesserView = styled.View`
  flex: .5 ;
  margin-bottom: 50px ;
  justify-content: space-between;
` ;

const WordView = styled.View` 
  flex-direction: row ;
  margin: 0 10px ;
  flex-wrap: wrap ;
` ;

const CrossView = styled.View` 
  flex-direction: row ;  
  height: 21px ;
` ;

const CrossCon = styled.View` 
  margin: auto 5px ;  
  
` ;

const GameText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 22px ;
  font-family: ${ ({theme}) => theme.fonts.third } ;
` ;

const TimerText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 26px ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

const HintView = styled.View`
  flex-direction: row ;  
  justify-content: center ;
  flex-wrap: wrap ;
` ;

const HintHead = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 18px ;
  text-transform: capitalize ;
  font-family: ${ ({theme}) => theme.fonts.mainBold } ;
` ;

const HintText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 18px ;
  font-family: ${ ({theme}) => theme.fonts.second } ;
  text-transform: capitalize ;
` ;

const GameHeader = styled.View`
  flex-direction: row ;  
  justify-content: space-between ;
  width: 100% ;
  position: absolute ;
  top: 0 ;
  z-index: 10 ;
  padding : 15px 20px ; 
` ;

const ScoreView = styled.View`
  flex-direction: row ;
  align-items: center ;
` ;

const ScoreHead = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 16px ;
  font-family: ${ ({theme}) => theme.fonts.second } ;
` ;

const ScoreText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 24px ;
  font-family: ${ ({theme}) => theme.fonts.mainBold } ;
  margin: 0 5px ;
` ;

export {MainView, AlphaRow, WordView, CrossView, CrossCon, GameText, GuesserView, TimerText, 
        HintHead, HintText, HintView, GameHeader, ScoreView, ScoreHead, ScoreText} ;