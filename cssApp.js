import styled from 'styled-components/native' ;
import { Button } from 'react-native-paper';

import {theme} from './src/theme.js' ;

const WhiteButton = styled(Button).attrs({
    color : theme.colors.white,
    labelStyle : {
      fontSize: 16,
      fontFamily: theme.fonts.main,
      color: theme.colors.main
    },
    style: {
      justifyContent: "center",
    },
    uppercase: false
})`
 ` ;

const KufamText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 24px ;
  font-family: ${ ({theme}) => theme.fonts.third } ;
` ;

export {WhiteButton, KufamText} ;