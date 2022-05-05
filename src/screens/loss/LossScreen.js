import LottieView from 'lottie-react-native';

import {MainView, LaughView} from './cssLossScreen.js' ;
import {WhiteButton, KufamText} from '../../../cssApp.js' ;

const LossScreen = ({navigation}) => {
    return (
      <MainView>
        <LaughView>
          <LottieView source={require('../../../assets/laugh.json')} autoPlay loop />
        </LaughView>
        <KufamText>Ha Ha Ha... You Lost</KufamText>
        <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>
          Go Back
        </WhiteButton>
      </MainView>
    ) ;
}

export default LossScreen ;