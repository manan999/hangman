import styled from 'styled-components/native' ;
import { Button } from 'react-native-paper';

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: space-evenly ;
  align-items: center ;
` ;

const SubText = styled.Text`
  color: ${ ({theme}) => theme.colors.main } ;
  font-size: ${ ({size}) => size?size:20 }px ;
  font-family: ${ ({bold, theme}) => bold?theme.fonts.mainThick:theme.fonts.main } ;
  text-align: center;
  margin-top: ${ ({mt}) => mt?mt:15 }px ; ;
` ;
  // font-weight: ${ ({bold}) => bold?'bold':'normal' } ;

const LevelButton = styled(Button).attrs({
    labelStyle : {
      fontSize: 18,
      fontFamily: theme.fonts.main,
      color: theme.colors.main,
    },
    uppercase: false
  })`
  margin: 10px 0 ;
  min-width: 153px ;
  border-radius: 99px ;
 ` ;

const FloatLeft = styled.View` 
  position: absolute ;
  height: 100% ;
  left: 10px ;
  justify-content: center ; 
 ` ;

export {MainView, SubText, LevelButton, FloatLeft} ;