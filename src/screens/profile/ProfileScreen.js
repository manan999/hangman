import { useState, useEffect, Fragment } from 'react' ;
import { View, Dimensions, Keyboard, TouchableOpacity, ToastAndroid } from 'react-native' ;
import { TextInput } from 'react-native-paper' ;
import LottieView from 'lottie-react-native';

import AvatarChoice from '../../comps/avatarchoice/AvatarChoice.js' ;
import { Row, WhiteButton, Shrink } from '../../../cssApp.js' ;
import { SubText, HomeImage } from '../home/cssHomeScreen.js' ;
import { MainView2, ProfileView, ProfileText, MarginRow } from './cssProfile.js' ;
import {theme} from '../../theme.js' ;
import sky from '../../../assets/sky.json' ;

const initObj = {
    login: { username: '', password: '' },
    register: { username: '', email : '', password: '', repass: '', avatar: `https://raw.githubusercontent.com/manan999/images/master/hangman/avatar/1.webp` }, 
};

const ProfileScreen = ({navigation, route}) => {
    const [mode, setMode] = useState('login') ;
    const [data, setData] = useState(initObj.login) ;
    const [logo, setLogo] = useState(true) ;
    const [hidePass, setHidePass] = useState(true) ;
    const windowHeight = Dimensions.get('window').height;
    
    useEffect(() => {
        const showKB = Keyboard.addListener("keyboardDidShow", () => setLogo(false));
        const hideKB = Keyboard.addListener("keyboardDidHide", () => setLogo(true));

        return () => {
          showKB.remove();
          hideKB.remove();
        };
    }, [])

    useEffect(() => setData(initObj[mode]), [mode])

    const formData = {
        login: [
            {name: 'username', type:'text', label: 'Enter your Username'},
            {name: 'password', type:'password', label: 'Enter your Password'}
        ],
        register: [
            {name: 'username', type:'text', label: 'Choose a Username'},
            {name: 'email', type:'text', label: 'Enter Email (Optional)'},
            {name: 'password', type:'password', label: 'Enter a Password'},
            {name: 'repass', type:'password', label: 'Re-Enter Password'},
        ],
    } ;

    const returnForm = () => {
        return formData[mode].map( one => {
            const {main, mainLight} = theme.colors ;
            const {name, type, label} = one ;
            
            let obj = {
                text : <TextInput key={name} label={label} value={data[name]} activeUnderlineColor={main} onChangeText={text => setData({...data, [name]: text })} selectionColor={mainLight} />,
                password : <TextInput key={name} label={label} value={data[name]} activeUnderlineColor={main} onChangeText={text => setData({...data, [name]: text })} selectionColor={mainLight} secureTextEntry={hidePass} right={<TextInput.Icon name={hidePass?"eye":"eye-off"} onPress={() => setHidePass(!hidePass)} />}/>,
            }

            return obj[type] ;
        });
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

    const checkMode = () => {
        if(mode === 'login') {
            return ( 
                <Fragment>
                    { returnLogo() }
                    <ProfileView>
                        <ProfileText size={20}> Sign In </ProfileText>
                        { returnForm() }
                        <Shrink><WhiteButton color={theme.colors.white} mode="contained" onPress={onLoginPress}> Login </WhiteButton></Shrink>
                        <MarginRow>
                            <TouchableOpacity onPress={() => ToastAndroid.show("Coming Soon !", ToastAndroid.SHORT)}>
                                <ProfileText size={14}> Forgot Password? </ProfileText>
                            </TouchableOpacity>
                        </MarginRow>
                        <Row>
                            <ProfileText size={14}> Don't have an Account? </ProfileText>
                            <WhiteButton color={theme.colors.white} mode="contained" onPress={()=>setMode('register')} size={13}> Sign Up </WhiteButton>
                        </Row>
                    </ProfileView>   
                </Fragment>
            ) ;
        }
        else if (mode === "register") {
            return (
                <Fragment>
                    <ProfileView>
                        <ProfileText size={16}> Sign Up </ProfileText>
                        <AvatarChoice url={data.avatar} setUrl={ url => setData({...data, avatar: url})}/>
                        { returnForm() }
                        <Shrink><WhiteButton color={theme.colors.white} mode="contained" onPress={onLoginPress}> Register </WhiteButton></Shrink>
                        <Row>
                            <ProfileText size={14}> Already have an Account? </ProfileText>
                            <WhiteButton color={theme.colors.white} mode="contained" onPress={()=>setMode('login')} size={13}> Sign In </WhiteButton>
                        </Row>
                    </ProfileView>
                </Fragment>
            ) ;
        }
    }

    return (
        <MainView2>
            <LottieView style={{height: windowHeight, position: 'absolute', top: 0}} source={sky} autoPlay loop />
            {checkMode()}
        </MainView2>
    ) ;
}

export default ProfileScreen ;