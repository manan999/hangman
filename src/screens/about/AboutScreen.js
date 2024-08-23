import { Dimensions, Linking} from 'react-native' ;
import LottieView from 'lottie-react-native';

import Img from '../../comps/img/Img.js' ;
import Img2 from '../../comps/img/Img2.js' ;
import { AboutView, LogoView, AboutText, AboutRow} from './cssAbout.js' ;
import { MainView, Button } from '@comps' ;
import sky from '../../../assets/sky.json' ;

const AboutScreen = ({navigation, route}) => {
    const windowHeight = Dimensions.get('window').height;

    return (
        <MainView>
            <LottieView style={{height: windowHeight, position: 'absolute', top: 0 }} source={sky} autoPlay loop />
            <LogoView>
                <Img src={require('../../../assets/AurBatao.png')} max={0.95} />
            </LogoView>
            <AboutView contentContainerStyle={{ alignItems: 'center' }}>
                <AboutText align="justify" size={18} > 
                    "Aur Batao : The Guessing Game" is a word-guessing game where you have to guess the word based on given alphabets and clues. The title is a phrase commonly used in Hindi language traditionally meaning tell me more. But a modern meaning of the phrase is similar to "Whats Up?".
                </AboutText>
                <Img2 max={0.9} src={{uri: "https://api.myarth.in/static/images/Logo/logo-white.png"}} />
                <AboutText size={18} > 
                   Myarth is an indie developer team based in New Delhi. We believe in making techonlogy for the future and we specialise in creating mobile apps and websites. We also build customised apps for organisations. You can find us at Our website 
                </AboutText>
                <Button buttonColor="white" color="main" mode="contained" onPress={()=> Linking.openURL('https://www.myarth.in')} size={13}> Visit Us </Button>
                <AboutText size={15} > 
                    Send your feedbacks or queries to myarth.tech@gmail.com
                </AboutText>
                <AboutText size={11} >Credits :</AboutText>
                <AboutRow>
                    <Button buttonColor="white" color="main" mode="contained" onPress={()=> Linking.openURL('https://lottiefiles.com/jkkim0124')} size={9}>Background Image </Button>
                    <Button buttonColor="white" color="main" mode="contained" onPress={()=> Linking.openURL('https://www.freepik.com/vectors/people-set')} size={9}> Avatar Images </Button>
                </AboutRow>
            </AboutView>
        </MainView>
    ) ;
}

export default AboutScreen ;