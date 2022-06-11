import {View, Dimensions} from 'react-native' ;
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import CircleButton from '../../comps/circlebutton/CircleButton.js' ;
import {Row} from '../../../cssApp.js' ;
import {MainView, SubText, HomeButton, HomeImage} from './cssHomeScreen.js' ;
import {theme} from '../../theme.js' ;
import sky from '../../../assets/sky.json' ;

const HomeScreen = ({navigation}) => {
    const windowHeight = Dimensions.get('window').height;

    return (
      <MainView>
        <LottieView style={{height: windowHeight, position: 'absolute', top: 0}} source={sky} autoPlay loop />
        <View>
            <HomeImage source={require('../../../assets/AurBatao.png')} />
            <SubText> A WORD GUESSING GAME </SubText>
        </View>
        <View>
            <HomeButton dark={true} color={theme.colors.main} icon="fire" mode="contained" onPress={() => navigation.replace('Game', {rounds: 100})}>
                Challenge
            </HomeButton>
            <HomeButton dark={true} color={theme.colors.main} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game', {rounds: 10})}>
                Practice
            </HomeButton>
            <HomeButton dark={true} color={theme.colors.darkGreen} icon="notebook" mode="contained" onPress={() => navigation.navigate('Tutorial')}>
                How To Play
            </HomeButton>
        </View>
        <Row>
            <CircleButton onButtonPress={()=>navigation.navigate('About')}>
                <FontAwesome5 name="info" size={25} color={theme.colors.main} />
            </CircleButton>
            <CircleButton onButtonPress={()=>navigation.navigate('Profile')}>
                <FontAwesome name="user" size={25} color={theme.colors.main} />
            </CircleButton>
            <CircleButton onButtonPress={()=>navigation.navigate('HighScore')}>
                <MaterialCommunityIcons name="podium" size={25} color={theme.colors.main} />
            </CircleButton>
            <CircleButton onButtonPress={()=>navigation.navigate('Settings')}>
                <FontAwesome name="gear" size={25} color={theme.colors.main} />
            </CircleButton>
        </Row>
      </MainView>
    ) ;
}

export default HomeScreen ;