import { useState, useEffect } from 'react' ;
import { View, Dimensions, Keyboard } from 'react-native' ;
import { TextInput } from 'react-native-paper' ;
import LottieView from 'lottie-react-native';

import { Row, WhiteButton, Shrink } from '../../../cssApp.js' ;
import { SubText, HomeImage } from '../home/cssHomeScreen.js' ;
import { MainView2, ProfileView, ProfileText, MarginRow } from './cssProfile.js' ;
import {theme} from '../../theme.js' ;
import sky from '../../../assets/sky.json' ;

const initObj = { username: '', password: '' } ;

const ProfileScreen = ({navigation, route}) => {
    const [data, setData] = useState(initObj) ;
    const [logo, setLogo] = useState(true) ;
    const windowHeight = Dimensions.get('window').height;
    
    useEffect(() => {
        const showKB = Keyboard.addListener("keyboardDidShow", () => setLogo(false));
        const hideKB = Keyboard.addListener("keyboardDidHide", () => setLogo(true));

        return () => {
          showKB.remove();
          hideKB.remove();
        };
    }, []);

    const formData = [
        {name: 'username', label: 'Enter Username'},
        {name: 'password', label: 'Enter Password'}
    ] ;

    const returnForm = () => {
        return formData.map( one => <TextInput key={one.name} label={one.label} value={data[one.name]} activeUnderlineColor={theme.colors.main} onChangeText={text => setData({...data, [one.name]: text })} selectionColor={theme.colors.mainLight} /> );
    }

    const onLoginPress = () => {
        console.log(data) ;
    }

    const returnLogo = () => {
        if(logo)
            return (
                <View>
                    <HomeImage source={require('../../../assets/AurBatao.png')} />
                    <SubText> A WORD GUESSING GAME </SubText>
                </View>
            ) ;
        else return null ;
    }

    return (
        <MainView2>
            <LottieView style={{height: windowHeight, position: 'absolute', top: 0}} source={sky} autoPlay loop />
            { returnLogo() }
            <ProfileView>
                <ProfileText size={20}> Sign In </ProfileText>
                { returnForm() }
                <Shrink><WhiteButton color={theme.colors.white} mode="contained" onPress={onLoginPress}> Login </WhiteButton></Shrink>
                <MarginRow>
                    <ProfileText size={14}> Forgot Password? </ProfileText>
                </MarginRow>
                <Row>
                    <ProfileText size={14}> Don't have an Account? </ProfileText>
                    <WhiteButton color={theme.colors.white} mode="contained" onPress={onLoginPress} size={13}> Sign Up </WhiteButton>
                </Row>
            </ProfileView>
        </MainView2>
    ) ;
}

export default ProfileScreen ;