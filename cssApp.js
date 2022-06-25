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

const Row = styled.View`
  flex-direction: row ; 
  justify-content: space-evenly ;
  align-items: center ;
  align-self: stretch ;
` ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: center ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
` ;

const MainScrollView = styled.ScrollView`
  background-color: ${ ({theme}) => theme.colors.main } ;
` ;

const Shrink = styled.View`
  align-items: center ; 
` ;

export {WhiteButton, KufamText, Row, MainView, Shrink, MainScrollView} ;