import styled from 'styled-components/native' ;
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import {theme} from '../../theme.js' ;

const TopicButton = styled(Button).attrs({
    labelStyle : {
      	fontSize: 20,
      	fontFamily: theme.fonts.main,
    },
    contentStyle : {
    	justifyContent: 'flex-start',
    },
    uppercase: false
})`
	margin: 10px 0 ;
  	min-width: 153px ;
 ` ;

export { TopicButton } ;