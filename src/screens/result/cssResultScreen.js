import styled from 'styled-components/native' ;
import { DataTable } from 'react-native-paper';

import { KufamText, Row } from '../../../cssApp.js' ;

const CapitalKufam = styled(KufamText)`
  text-transform: capitalize ;
` ;

const ButtonRow = styled(Row)`
  margin: 15px 0 25px ;
` ; 

const ScoreTable = styled(DataTable)` 
  color: ${ ({theme}) => theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

export {CapitalKufam, ButtonRow, ScoreTable} ;