import styled from 'styled-components/native' ;
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: center ;
  align-items: center ;
` ;

// export const SearchBarCon = styled.View`
//   background-color: ${ ({theme}) => theme.colors.ui.mainBg} ;
//   padding: ${ ({theme}) => theme.space[2]} ; 
//   flex-direction: row ;
//   overflow: hidden ;
// ` ;

// export const SearchBar = styled(Searchbar)`
//     flex: 1 ;
//  ` ;

const HomeButton = styled(Button).attrs({
    color : theme.colors.main,
    labelStyle : {
      fontSize: 16,
      fontFamily: theme.fonts.main,
    },
    style: {
      justifyContent: "center",
    },
    uppercase: false
})`
  margin: 10px 0 ;
  min-width: 153px ;
 ` ;

export {MainView, HomeButton} ;