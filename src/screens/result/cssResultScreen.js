import styled from 'styled-components/native' ;
import { DataTable } from 'react-native-paper';

import { Row } from '@comps' ;

const ButtonRow = styled(Row)`
  margin: 15px 0 25px ;
` ; 

const ScoreTable = styled(DataTable)` 
  color: ${ ({theme}) => theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

export { ButtonRow, ScoreTable } ;