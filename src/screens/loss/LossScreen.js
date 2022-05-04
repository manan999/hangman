import LottieView from 'lottie-react-native';

import {MainView} from './cssLossScreen.js' ;
import {WhiteButton, KufamText} from '../../../cssApp.js' ;

const LossScreen = ({navigation}) => {
    return (
      <MainView>
        <LottieView source={require('./laugh.json')} autoPlay loop />
        <KufamText>Ha Ha Ha... You Lost</KufamText>
        <WhiteButton dark={false} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game')}>
          Play Again
        </WhiteButton>
      </MainView>
    ) ;
}

export default LossScreen ;