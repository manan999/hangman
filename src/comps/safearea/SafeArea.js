import styled from 'styled-components/native' ;
import { SafeAreaView, Platform, StatusBar } from 'react-native';

const SafeArea = styled.SafeAreaView`
  flex: 1 ;
  padding-top: ${Platform.OS==="android"?StatusBar.currentHeight:0}px ; 
` ;

export default SafeArea ;