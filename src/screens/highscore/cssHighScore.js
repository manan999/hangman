import styled from 'styled-components/native' ;
import { DataTable } from 'react-native-paper';

const DDView = styled.View`
  padding: 0 15px 15px ;
` ;

const ScoreTable = styled(DataTable)` 
  color: ${ ({theme}) => theme.colors.white } ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

export {DDView, ScoreTable} ;