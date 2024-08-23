import styled from 'styled-components/native' ;

import {MainScrollView, P, Row} from '@comps' ;

const LogoView = styled.View`
	padding: 20px 0 ;
` ;

const AboutView = styled(MainScrollView)` 
	padding: 1px 20px ;
	background-color: ${ ({theme}) => theme.colors.halfMain } ;
` ;

const AboutText = styled(P)`
  margin: 15px 0 3px ;
` ;

const AboutRow = styled(Row)`
  margin-bottom: 15px ;
` ;

export {AboutView, LogoView, AboutText, AboutRow} ;