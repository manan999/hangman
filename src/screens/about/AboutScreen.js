import { View, Text, Dimensions} from 'react-native' ;
import LottieView from 'lottie-react-native';

import {HomeImage } from '../home/cssHomeScreen.js' ;
import {MainView, KufamText} from '../../../cssApp.js' ;
import sky from '../../../assets/sky.json' ;

import {AboutView, LogoImage, LogoView, AboutText} from './cssAbout.js' ;

const AboutScreen = ({navigation, route}) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <MainView>
            <LottieView style={{height: windowHeight, position: 'absolute', top: 0 }} source={sky} autoPlay loop />
            <LogoView>
                <HomeImage source={require('../../../assets/AurBatao.png')} />
            </LogoView>
            <AboutView contentContainerStyle={{ alignItems: 'center' }}>
                <AboutText size={20} > 
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AboutText>
                <LogoImage source={{uri: "https://raw.githubusercontent.com/manan999/images/master/Logo/logo-black.png"}} />
                <AboutText size={20} > 
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AboutText>
            </AboutView>
        </MainView>
    ) ;
}

export default AboutScreen ;