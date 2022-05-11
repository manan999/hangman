import styled from 'styled-components/native' ;
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: space-evenly ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.mainLight} ;
` ;

const SubText = styled.Text`
  color: ${ ({theme}) => theme.colors.main } ;
  font-size: 20px ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
  text-align: center;
  margin-top: 15px ;
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
    labelStyle : {
      fontSize: 16,
      fontFamily: theme.fonts.main,
    },
    uppercase: false
})`
  margin: 10px 0 ;
  min-width: 153px ;
  flex-direction: row ;
  justify-content: center ;
 ` ;

const HomeImage = styled.Image`
  width: 360px ;
  height: 180px ; 
` ;

export {MainView, SubText, HomeButton, HomeImage} ;