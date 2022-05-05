import styled from 'styled-components/native' ;
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: space-evenly ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
` ;

const AlphaRow = styled.View` 
  flex-direction: row ;
  justify-content: center ;
  flex-wrap: wrap ;
` ;

const AlphaView = styled.View` 
  background-color: ${ ({theme}) => theme.colors.white } ;
  margin: 2px ;
  padding: 2px ;
  align-items: center; 
  justify-content: center ;
  border-radius: 2px ;
  min-width: 30px ;
  opacity: ${ ({guessed}) => guessed?0.3:1 }
` ;

const AlphaText = styled.Text` 
  color: ${ ({theme}) => theme.colors.main } ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
  font-size: 28px ;
  text-transform: uppercase ;
` ;

const GuesserView = styled.View`
  flex: .5 ;
  margin-bottom: 50px ;
` ;

const LetterView = styled.View` 
  margin: 2px ;
  padding: 2px ;
  align-items: center; 
  justify-content: center ;
  min-width: 30px ;
` ;

const LetterText = styled.Text` 
  color: ${ ({theme}) => theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.mainBold } ;
  font-size: 28px ;
  text-transform: uppercase ;
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
  font-size: 24px ;
  font-family: ${ ({theme}) => theme.fonts.third } ;
` ;

const TimerText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 26px ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

export {MainView, AlphaRow, AlphaView, AlphaText, LetterView, LetterText, WordView, 
  CrossView, CrossCon, GameText, GuesserView, TimerText} ;