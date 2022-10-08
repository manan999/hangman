import styled from 'styled-components/native' ;
import { View, Text } from 'react-native';

import {theme} from '../../theme.js' ;

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
  font-size: 24px ;
  text-transform: uppercase ;
` ;

const LetterView = styled.View` 
  margin: 2px ;
  padding: 2px ;
  align-items: center; 
  justify-content: center ;
  min-width: 26px ;
` ;

const LetterText = styled.Text` 
  color: ${ ({theme, color}) => color?color:theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.mainBold } ;
  font-size: ${ ({size}) => size?size:24 }px ;
  text-transform: uppercase ;
` ;

export {LetterText, LetterView, AlphaText, AlphaView} ;