import styled from 'styled-components/native' ;
import { Platform, StatusBar } from 'react-native';
import { Button as Btn } from 'react-native-paper';

import { theme } from '@theme' ;

const SafeArea = styled.SafeAreaView`
  flex: 1 ;
  padding-top: ${Platform.OS==="android"?StatusBar.currentHeight:0}px ; 
` ;

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

 const Capsule = styled(Btn).attrs(({size, font, color, small}) => ({
    labelStyle : {
      fontSize: size?size:18,
      fontFamily: font?font:theme.fonts.second,
      color: color?color:theme.colors.white,
      paddingTop: small?0:5,
      paddingBottom: small?0:5,
      letterSpacing: small?0:1,
    },
    uppercase: false
  }))`
  margin: 10px 0 ;
  min-width: ${ ({small, mw}) => !small||mw?(mw?mw:200):0}px ;
  border-radius: 99px ;
  border: 1px solid ${ ({theme}) => theme.colors.main } ;
  background-color: ${ ({buttonColor, theme}) => !buttonColor?theme.colors.main:buttonColor } ;
 ` ;

const P = styled.Text`
  color: ${ ({theme, color}) => color&&theme.colors[color]?theme.colors[color]:theme.colors.black } ;
  font-size: ${ ({size}) => size?size:24 }px ;
  font-family: ${ ({theme, font}) => font&&theme.fonts[font]?theme.fonts[font]:theme.fonts.main } ;
  text-transform: ${ ({cap}) => cap?'capitalize':'none' } ;
  text-align: ${ ({align}) => align?align:'center' } ;
` ;

const Row = styled.View`
  flex-direction: row ; 
  align-self: stretch ;
  justify-content: ${ ({jc}) => jc?jc:'space-evenly' } ;
  align-items: ${ ({ai}) => ai?ai:'center' } ;
  gap: ${ ({gap}) => gap?gap:0 }px ;
` ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: ${ ({jc}) => jc?jc:'space-evenly' } ;
  align-items: ${ ({ai}) => ai?ai:'center' } ;
  background-color: ${ ({theme, color}) => color&&theme.colors[color]?theme.colors[color]:theme.colors.main } ;
` ;

const MainScrollView = styled.ScrollView`
  background-color: ${ ({theme, color}) => color&&theme.colors[color]?theme.colors[color]:theme.colors.main } ;
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

const GreenButton = styled(Button)` 
  margin: 20px 0 0 ;
` ;

export { Button, P, Row, MainView, Shrink, MainScrollView, GreenView, SafeArea, GreenButton } ;