import styled from 'styled-components/native' ;
import { Platform, StatusBar } from 'react-native' ;
import { Button as Btn } from 'react-native-paper' ;

import { theme } from '@theme' ;

const SafeArea = styled.SafeAreaView`
  flex: 1 ;
  padding-top: ${Platform.OS==="android"?StatusBar.currentHeight:0}px ; 
` ;

const Button = styled(Btn).attrs(({size=16, font="main", color="white", jc="center", padding=2, ripple="thodaWhite" }) => ({
    labelStyle : {
      fontSize: size,
      fontFamily: theme.fonts[font],
      color: theme.colors[color],
      paddingTop: padding,
      paddingBottom: padding,
    },
    contentStyle: {
      justifyContent: jc,
    },
    uppercase: false,
    rippleColor: theme.colors[ripple],
  }))`
  margin: ${({margin=8}) => margin}px 0 ;
  min-width: ${({mw=150})=>mw}px ;
  border-radius: ${({br=8})=>br}px ;
  border: 1px solid ${ ({buttonColor="main", borderColor, theme}) => borderColor?theme.colors[borderColor]:theme.colors[buttonColor] } ;
  background-color: ${ ({buttonColor="main", theme}) => theme.colors[buttonColor] } ;

 ` ;

const P = styled.Text`
  color: ${ ({theme, color="main"}) => theme.colors[color] } ;
  font-size: ${ ({size=24})=>size }px ;
  font-family: ${ ({theme, font}) => font&&theme.fonts[font]?theme.fonts[font]:theme.fonts.main } ;
  text-transform: ${ ({cap}) => cap?'capitalize':'none' } ;
  text-align: ${ ({align='center'}) => align } ;
` ;

const Row = styled.View`
  flex-direction: row ; 
  align-self: stretch ;
  justify-content: ${ ({jc='space-evenly'})=>jc } ;
  align-items: ${ ({ai='center'})=>ai } ;
  gap: ${ ({gap=0})=>gap }px ;
` ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: ${ ({jc='space-evenly'})=>jc } ;
  align-items: ${ ({ai='center'})=>ai } ;
  background-color: ${ ({theme, color="main"}) => theme.colors[color] } ;
` ;

const MainScrollView = styled.ScrollView`
  background-color: ${ ({theme, color="main"}) => theme.colors[color] } ;
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