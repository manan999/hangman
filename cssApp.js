import styled from 'styled-components/native' ;
import { Button as Btn } from 'react-native-paper';

import {theme} from './src/theme.js' ;

const Button = styled(Btn).attrs(({size, font, color, small, cap, jc}) => ({
    labelStyle : {
      fontSize: size?size:16,
      fontFamily: font?font:theme.fonts.main,
      color: color?color:theme.colors.white,
    },
    contentStyle: {
      justifyContent: jc?jc:'center',
    },
    uppercase: false
  }))`
  margin: 10px 0 ;
  min-width: ${ ({small, mw}) => !small||mw?(mw?mw:153):0}px ;
  border-radius: ${ ({cap}) => cap?99:4}px ;
  border: 1px solid ${ ({buttonColor, theme}) => !buttonColor?theme.colors.main:buttonColor } ;
  background-color: ${ ({buttonColor, theme}) => !buttonColor?theme.colors.main:buttonColor } ;
 ` ;

const KufamText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: ${ ({size}) => size?size:24 }px ;
  font-family: ${ ({theme}) => theme.fonts.third } ;
  margin: 15px 0 10px ;
` ;

const BlackKufam = styled.Text`
  color: ${ ({theme}) => theme.colors.black } ;
  font-size: ${ ({size}) => size?size:24 }px ;
  font-family: ${ ({theme, main}) => main?theme.fonts.main:theme.fonts.third } ;
  text-align: center ;
  text-transform: ${ ({cap}) => cap?'capitalize':'none' } ;
` ;

const Row = styled.View`
  flex-direction: row ; 
  justify-content: ${ ({jc}) => jc?jc:'space-evenly' } ;
  align-items: center ;
  align-self: stretch ;
  margin-bottom: ${ ({mb}) => mb?mb:0 }px ;
` ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: center ;
  align-items: center ;
  background-color: ${ ({theme, white}) => white?theme.colors.white:theme.colors.main } ;
` ;

const MainScrollView = styled.ScrollView`
  background-color: ${ ({theme}) => theme.colors.main } ;
  align-self: stretch ;
` ;

const Shrink = styled.View`
  align-items: center ; 
` ;

const GreenView = styled.View`
  background-color: ${ ({theme}) => theme.colors.quarterBlack } ;
  align-self: stretch ;
  align-items: center ;
  margin-bottom: 15px ;
  padding: 10px 0 ;
` ;

export {Button, KufamText, BlackKufam, Row, MainView, Shrink, MainScrollView, GreenView} ;