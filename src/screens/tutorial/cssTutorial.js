import styled from 'styled-components/native' ;
import { Image } from 'react-native';
import {Button} from 'react-native-paper' ;

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: space-evenly ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
` ;

const DemoImage = styled.Image` 
	max-width: 90% ;
	max-height: 70% ;	
	border-radius: 10px  ;
 ` ;

const DemoText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
  font-size: 18px ;
  padding: 0 10px ;
  letter-spacing: .4px ;
  line-height: 25px ;
` ;

const WhiteButton = styled(Button).attrs({
    backgroundColor: theme.colors.white,
    labelStyle : {
      fontSize: 16,
      fontFamily: theme.fonts.main,
      color: theme.colors.main,
    },
    style: {
      justifyContent: "center",
    },
    uppercase: false
})`
  min-width: 110px ;
 ` ;

export {DemoImage, MainView, DemoText, WhiteButton} ;