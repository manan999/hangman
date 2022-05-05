import LottieView from 'lottie-react-native';

import {MainView, WowView} from './cssWinScreen.js' ;
import {WhiteButton, KufamText} from '../../../cssApp.js' ;

const WinScreen = ({navigation}) => {
    return (
      <MainView>
        <WowView>
          <LottieView source={require('../../../assets/wow.json')} autoPlay loop />
        </WowView>
        <KufamText>Wow... You Won</KufamText>
         <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>
          Go Back
        </WhiteButton>
      </MainView>
    ) ;
}

export default WinScreen ;