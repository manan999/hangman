import styled from 'styled-components/native' ;
import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

import { KufamText, Row } from '../../../cssApp.js' ;
import { theme } from '../../theme.js' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: center ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
` ;

const CapitalKufam = styled(KufamText)`
  text-transform: capitalize ;
` ;

const ButtonRow = styled(Row)`
  margin: 15px 0 ;
` ; 

const ScoreTable = styled(DataTable)` 
  color: ${ ({theme}) => theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

export {MainView, CapitalKufam, ButtonRow, ScoreTable} ;