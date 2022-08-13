import styled from 'styled-components/native' ;
import { Button } from 'react-native-paper';

import {theme} from './src/theme.js' ;

const WhiteButton = styled(Button).attrs(({size}) => ({
    color : theme.colors.white,
    labelStyle : {
      fontSize: size?size:16,
      fontFamily: theme.fonts.main,
      color: theme.colors.main
    },
    style: {
      justifyContent: "center",
    },
    uppercase: false
}))`` ;

const KufamText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: ${ ({size}) => size?size:24 }px ;
  font-family: ${ ({theme}) => theme.fonts.third } ;
  margin: 15px 0 10px ;
` ;

const BlackKufam = styled.Text`
  color: ${ ({theme}) => theme.colors.black } ;
  font-size: ${ ({size}) => size?size:24 }px ;
  font-family: ${ ({theme}) => theme.fonts.third } ;
  text-align: center ;
` ;

const Row = styled.View`
  flex-direction: row ; 
  justify-content: ${ ({jc}) => jc?jc:'space-evenly' } ;
  align-items: center ;
  align-self: stretch ;
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

export {WhiteButton, KufamText, BlackKufam, Row, MainView, Shrink, MainScrollView, GreenView} ;