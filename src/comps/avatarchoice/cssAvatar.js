import styled from 'styled-components/native' ;
import { View } from 'react-native';

import {theme} from '../../theme.js' ;

const AvatarView = styled.View`
  align-self: center ;
  position: relative ;
` ;

const AvatarButtonView = styled.View`
  position: absolute ;
  bottom: 0 ;
  right: 0 ;
` ;

export { AvatarView, AvatarButtonView } ;