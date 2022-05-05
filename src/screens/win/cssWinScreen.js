import styled from 'styled-components/native' ;
import { View, Text } from 'react-native';

import {theme} from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: center ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
` ;

const WowView = styled.View`
  width: 100% ;
  height: 40% ;
` ;

export {MainView, WowView} ;