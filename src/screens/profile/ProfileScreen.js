import { useState, useEffect, useContext } from 'react' ;
import { View, Text, Dimensions, Keyboard, TouchableOpacity, ToastAndroid } from 'react-native' ;
import { Snackbar, TextInput } from 'react-native-paper' ;
import LottieView from 'lottie-react-native';

import AvatarChoice from '../../comps/avatarchoice/AvatarChoice.js' ;
import { Row, WhiteButton, Shrink } from '../../../cssApp.js' ;
import { SubText, HomeImage } from '../home/cssHomeScreen.js' ;
import { MainView2, ProfileView, ProfileText, MarginRow } from './cssProfile.js' ;
import { invalidEmail, invalidPass, invalidName, isBlank } from '../../comps/valid.js' ;
import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import sky from '../../../assets/sky.json' ;

const initObj = {
    login: { name: '', password: '' },
    register: { name: '', email : '', password: '', repass: '', image: `https://raw.githubusercontent.com/manan999/images/master/hangman/avatar/1.webp` }, 
};

const ProfileScreen = ({navigation, route}) => {
    const [mode, setMode] = useState('login') ;
    const [data, setData] = useState(initObj.login) ;
    const [logo, setLogo] = useState(true) ;
    const [hidePass, setHidePass] = useState({password: true, repass: true}) ;
    const [error, setError] = useState([]) ;
    const [errorCount, setErrorCount] = useState(null) ;

    const {user, loadUser} = useContext(UserContext) ;
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

    useEffect(() => {
        if(errorCount === 0 && data !== initObj[mode]) {
            if(mode === 'register') 
                sendRegisterReq() ;
            else if(mode === 'login')
                sendLoginReq() ;
        }
    }, [errorCount, error])

    const formData = {
        login: [
            {name: 'name', type:'text', label: 'Enter your Username'},
            {name: 'password', type:'password', label: 'Enter your Password'}
        ],
        register: [
            {name: 'name', type:'text', label: 'Choose a Username'},
            {name: 'email', type:'text', label: 'Enter Email (Optional)'},
            {name: 'password', type:'password', label: 'Enter a Password'},
            {name: 'repass', type:'password', label: 'Re-Enter Password'},
        ],
    } ;

    const sendLoginReq = () => {
        ToastAndroid.show("Please Wait...", ToastAndroid.SHORT)
        const {name, password} = data ;

        // fetch('https://web.myarthhardware.com/myarth/login' ,{
        fetch('http://192.168.1.8:8000/myarth/login' ,{
            method : 'post',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({name, password}),
        })
        .then(res =>  res.json())
        .then(resp => { 
            // console.log(resp) ;  
            if(resp.user) {
                loadUser(resp) ;      
                ToastAndroid.show("Logged In Successfully", ToastAndroid.LONG)
                navigation.replace('Home') ;
            }
            else {
                setError([resp]) ;
                setErrorCount(1) ;
            }
        })
        .catch( err  => {
            console.log(JSON.stringify(err)) ;
            // ToastAndroid.show(JSON.stringify(err), ToastAndroid.SHORT)
        }) ;
    }

    const sendRegisterReq = () => {
        ToastAndroid.show("Please Wait...", ToastAndroid.SHORT)
        const {name, email, image, password} = data ;

        // fetch('https://web.myarthhardware.com/myarth/users' ,{
        fetch('http://192.168.1.8:8000/myarth/users' ,{
            method : 'post',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({name, email, image, password}),
        })
        .then(res =>  res.json())
        .then(resp => { 
            // console.log(resp) ;  
            if(resp.user) {
                loadUser(resp) ;      
                ToastAndroid.show("Registered Successfully", ToastAndroid.LONG)
                navigation.replace('Home') ;
            }
            else {
                setError([resp]) ;
                setErrorCount(1) ;
            }
        })
        .catch( err  => {
            console.log(err) ;
            ToastAndroid.show(err, ToastAndroid.SHORT)
        }) ;
    }

    const returnForm = () => {
        return formData[mode].map( one => {
            const {main, mainLight} = theme.colors ;
            const {name, type, label} = one ;
            
            let obj = {
                text : <TextInput key={name} label={label} value={data[name]} activeUnderlineColor={main} onChangeText={text => setData({...data, [name]: text })} selectionColor={mainLight} />,
                password : <TextInput key={name} label={label} value={data[name]} activeUnderlineColor={main} onChangeText={text => setData({...data, [name]: text })} selectionColor={mainLight} secureTextEntry={hidePass[name]} right={<TextInput.Icon name={hidePass[name]?"eye":"eye-off"} onPress={() => setHidePass({...hidePass, [name]: !hidePass[name]})} />}/>,
            }

            return obj[type] ;
        });
    }

    const onLoginPress = () => {
        const {name, password} = data;
        const errorArr = [isBlank(name, 'Username'), isBlank(password, 'password')].filter(one => one) ;

        console.log(errorArr, data) ; 

        setError(errorArr) ;
        setErrorCount(errorArr.length) ;
    }

    const onRegisterPress = () => {
        const {name, email, password, repass} = data;
        const errorArr = [invalidName(name), invalidEmail(email), invalidPass(password, repass)].filter(one => one) ;

        setError(errorArr) ;
        setErrorCount(errorArr.length) ;
    }

    const returnLogo = () => {
        if(logo)
            return (
                <View>
                    <HomeImage source={require('../../../assets/AurBatao.png')} />
                    <SubText> A WORD GUESSING GAME </SubText>
                </View>
            ) ;
    }

    const returnAvatarChoice = () => {
        if(logo)
            return <AvatarChoice url={data.image} setUrl={ url => setData({...data, image: url})}/> ;
    }

    const returnSignInText = () => {
        if(logo)
            return (
                <Row>
                    <ProfileText size={14}> Already have an Account? </ProfileText>
                    <WhiteButton color={theme.colors.white} mode="contained" onPress={()=>setMode('login')} size={13}> Sign In </WhiteButton>
                </Row>
            ) ;
    }

    const checkMode = () => {
        if(mode === 'login') {
            return ( 
                <>
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
                </>
            ) ;
        }
        else if (mode === "register") {
            return (
                <>
                    <ProfileView fl={logo?0.9:1}>
                        <ProfileText size={16}> Sign Up </ProfileText>
                        { returnAvatarChoice() }
                        { returnForm() }
                        <Shrink><WhiteButton color={theme.colors.white} mode="contained" onPress={onRegisterPress}> Register </WhiteButton></Shrink>
                        { returnSignInText() }
                    </ProfileView>
                </>
            ) ;
        }
    }

    if(user.name)
        return (
            <MainView2>
                <LottieView style={{height: windowHeight, position: 'absolute', top: 0}} source={sky} autoPlay loop />
                <Text> {user.name} </Text>
                <TouchableOpacity onPress={()=>loadUser({})}><Text>Logout</Text></TouchableOpacity>
            </MainView2>
        ) ;
    else
        return (
            <MainView2>
                <LottieView style={{height: windowHeight, position: 'absolute', top: 0}} source={sky} autoPlay loop />
                {checkMode()}
                <Snackbar visible={error.length>0} onDismiss={() => setError([...error.slice(1)])} action={{label: 'OK', color: theme.colors.red, onPress:() => {}}}>{error[0]}</Snackbar>
            </MainView2>
        ) ;
}

export default ProfileScreen ;