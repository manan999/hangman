import { useState, useEffect, useContext } from 'react' ;
import { View, Text, Dimensions, Keyboard, TouchableOpacity, ToastAndroid } from 'react-native' ;
import { Snackbar, TextInput, Avatar } from 'react-native-paper' ;
import LottieView from 'lottie-react-native';

import AvatarChoice from '../../comps/avatarchoice/AvatarChoice.js' ;
import { Row, WhiteButton, Shrink, MainView, GreenView, MainScrollView } from '../../../cssApp.js' ;
import { SubText, HomeImage } from '../home/cssHomeScreen.js' ;
import { MainView2, ProfileView, ProfileText, MarginRow, DisplayText, ProfileTop } from './cssProfile.js' ;
import { invalidEmail, invalidPass, invalidName, isBlank } from '../../comps/valid.js' ;
import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { Gem } from '../../comps/icons.js' ;
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
    const [userData, setUserData] = useState({}) ;    

    const {user, loadUser, userToken} = useContext(UserContext) ;
    const windowHeight = Dimensions.get('window').height;

    const avatarProps = {
        style : { backgroundColor: theme.colors.white},
        size : 100,
        source : user.name?{uri: user.image}:require('../../../assets/user.png'),
    } ;
    
    useEffect(() => {
        const showKB = Keyboard.addListener("keyboardDidShow", () => setLogo(false));
        const hideKB = Keyboard.addListener("keyboardDidHide", () => setLogo(true));

        return () => {
          showKB.remove();
          hideKB.remove();
        };
    }, [])

    useEffect(() => {
        if(user.name)
        {
            fetch('https://web.myarthhardware.com/myarth/users/me' ,{
            // fetch('http://192.168.0.103:8000/myarth/users/me' ,{
                method : 'get',
                headers : { 'Content-Type' : 'application/json' , 'Authorization': `Bearer ${userToken}`},
            })
            .then(res =>  res.json())
            .then(data => {
                // console.log(data, 'data') ;
                let arr = data.filter(one => one.mode === 'practice') ;
                let practiceTotal = arr.length ;
                let userObj = {} ;
                
                if(practiceTotal > 0) {
                    let totalScore = 0 ;
                    let totalHints = 0 ;
                    let totalTopics = {} ;
                    arr.forEach((one,i) => {
                        totalHints += one.hints ;
                        totalScore += one.score ;
                        totalTopics[one.topic]?(totalTopics[one.topic]++):(totalTopics[one.topic] = 1) 
                    })
                    Object.keys(totalTopics).forEach(one => totalTopics[one] = Math.round(totalTopics[one]*100/practiceTotal))

                    let practiceAvgScore = Math.floor(totalScore/practiceTotal) ; 
                    let practiceAvgHints = Math.floor(totalHints/practiceTotal) ; 
                    userObj = {totalHints, totalScore, practiceAvgScore, practiceAvgHints, totalTopics, ...userObj} ;
                }


                let arr2 = data.filter(one => one.mode === 'challenge') ;
                let challTotal = arr2.length ;
                
                if(challTotal > 0) {
                    let challTotalScore = 0 ;
                    let challTotalHints = 0 ;
                    let challTotalTopics = {} ;

                    arr2.forEach((one,i) => {
                        challTotalHints += one.hints ;
                        challTotalScore += one.score ;
                        challTotalTopics[one.topic]?(challTotalTopics[one.topic]++):(challTotalTopics[one.topic] = 1) 
                    })

                    Object.keys(challTotalTopics).forEach(one => challTotalTopics[one] = Math.round(challTotalTopics[one]*100/challTotal))

                    let challAvgScore = Math.floor(challTotalScore/challTotal) ; 
                    let challAvgHints = Math.floor(challTotalHints/challTotal) ;
                    userObj = {challTotalHints, challTotalScore, challAvgScore, challAvgHints, challTotalTopics, ...userObj} ;
                }
                
                setUserData(userObj) ;
            })
            .catch( err  => console.log(err) ) ;     
        }   
    }, [])

    useEffect(() => mode==='edit'?setData(user):setData(initObj[mode]), [mode])

    useEffect(() => {
        if(errorCount === 0 && data !== initObj[mode]) {
            if(mode === 'register') 
                sendRegisterReq() ;
            else if(mode === 'login')
                sendLoginReq() ;
            else if(mode === 'edit')
                sendEditReq() ;
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
        edit: [
            {name: 'name', type:'text', label: 'Change your Username'},
            {name: 'email', type:'text', label: 'Change Email (Optional)'},
        ],
    } ;

    const sendLoginReq = () => {
        ToastAndroid.show("Please Wait...", ToastAndroid.SHORT)
        const {name, password} = data ;

        fetch('https://web.myarthhardware.com/myarth/login' ,{
        // fetch('http://192.168.0.103:8000/myarth/login' ,{
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

        fetch('https://web.myarthhardware.com/myarth/users' ,{
        // fetch('http://192.168.0.103:8000/myarth/users' ,{
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

    const sendEditReq = () => {
        ToastAndroid.show("Please Wait...", ToastAndroid.SHORT)
        const {name, email, image} = data ;

        // console.log(name, email, image) ;

        fetch('https://web.myarthhardware.com/myarth/users/me' ,{
        // fetch('http://192.168.0.103:8000/myarth/users' ,{
            method : 'PATCH',
            headers : { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${userToken}`},
            body : JSON.stringify({name, email, image}),
        })
        .then(res =>  res.json())
        .then(resp => { 
            // console.log(resp) ;  
            if(resp.name) {
                loadUser({ user: resp, token: userToken}) ;      
                ToastAndroid.show("Details Changed Successfully", ToastAndroid.LONG)
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

    const onLogoutClick = () => {
        ToastAndroid.show("Please Wait...", ToastAndroid.SHORT)

        fetch('https://web.myarthhardware.com/myarth/logout' ,{
        // fetch('http://192.168.0.103:8000/myarth/users' ,{
            method : 'post',
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${userToken}`},
        })
        .then(res =>  res.json())
        .then(resp => { 
            // console.log(resp) ;  
            if(typeof resp === 'string') {
                loadUser({}) ;
                ToastAndroid.show("Logged Out Successfully", ToastAndroid.LONG)
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

        setError(errorArr) ;
        setErrorCount(errorArr.length) ;
    }

    const onRegisterPress = () => {
        const {name, email, password, repass} = data;
        const errorArr = [invalidName(name), invalidEmail(email), invalidPass(password, repass)].filter(one => one) ;

        setError(errorArr) ;
        setErrorCount(errorArr.length) ;
    }

     const onEditPress = () => {
        const {name, email} = data;
        const errorArr = [invalidName(name), invalidEmail(email)].filter(one => one) ;

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
        if(logo || mode === 'edit')
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
                        <Shrink><WhiteButton color={theme.colors.white} mode="contained" onPress={onRegisterPress}> Confirm </WhiteButton></Shrink>
                    </ProfileView>
                </>
            ) ;
        }
    }

    const userDataCheck = () => {
        // console.log(userData) ;
        if(userData.totalScore)
            return ( 
                <GreenView>
                    <Row jc="space-between">
                        <DisplayText size={20}>Total Score </DisplayText>
                        <DisplayText size={20}> {userData.totalScore}</DisplayText>
                    </Row>
                    <Row jc="space-between">
                        <DisplayText size={20}>Average Score </DisplayText>
                        <DisplayText size={20}> {userData.practiceAvgScore}</DisplayText>
                    </Row>
                    <Row jc="space-between">
                        <DisplayText size={20}>Total Hints Used </DisplayText>
                        <DisplayText size={20}> {userData.totalHints}</DisplayText>
                    </Row>
                    <Row jc="space-between">
                        <DisplayText size={20}>Average Hints Used </DisplayText>
                        <DisplayText size={20}> {userData.practiceAvgHints}</DisplayText>
                    </Row>
                    <DisplayText size={20}>Topics</DisplayText>
                    <View>
                        {Object.keys(userData.totalTopics).map((one,i)=><DisplayText key={i} size={15}>{one}&emsp;{userData.totalTopics[one]}%</DisplayText>)}
                    </View>
                </GreenView>
            ) ;
        else
            return <DisplayText size={15}> Play Practice Mode to show analysis here</DisplayText>
    }

    const userDataCheck2 = () => {
        if(userData.challTotalScore)
            return ( 
                <GreenView>
                    <Row jc="space-between">
                        <DisplayText size={20}>Total Score </DisplayText>
                        <DisplayText size={20}> {userData.challTotalScore}</DisplayText>
                    </Row>
                    <Row jc="space-between">
                        <DisplayText size={20}>Average Score </DisplayText>
                        <DisplayText size={20}> {userData.challAvgScore}</DisplayText>
                    </Row>
                    <Row jc="space-between">
                        <DisplayText size={20}>Total Hints Used </DisplayText>
                        <DisplayText size={20}> {userData.challTotalHints}</DisplayText>
                    </Row>
                    <Row jc="space-between">
                        <DisplayText size={20}>Average Hints Used </DisplayText>
                        <DisplayText size={20}> {userData.challAvgHints}</DisplayText>
                    </Row>
                    <DisplayText size={20}>Topics</DisplayText>
                    <View>
                        {Object.keys(userData.challTotalTopics).map((one,i)=><DisplayText key={i} size={15}>{one}&emsp;{userData.challTotalTopics[one]}%</DisplayText>)}
                    </View>
                </GreenView>
            ) ;
        else
            return <DisplayText size={15}> Play Challenge Mode to show analysis here</DisplayText>
    }

    if(user.name)
         if( mode === "edit") {
            return (
                <MainView>
                    <ProfileView fl={logo?0.9:1}>
                        <ProfileText size={26}> Edit Profile </ProfileText>
                        { returnAvatarChoice() }
                        { returnForm() }
                        <Shrink><WhiteButton color={theme.colors.white} mode="contained" onPress={onEditPress}> Submit </WhiteButton></Shrink>
                    </ProfileView>
                    <Snackbar visible={error.length>0} onDismiss={() => setError([...error.slice(1)])} action={{label: 'OK', color: theme.colors.red, onPress:() => {}}}>{error[0]}</Snackbar>  
                </MainView>
            ) ;
        }
        else 
            return (
                <MainScrollView contentContainerStyle={ {alignItems: 'center'} }>
                    <ProfileTop>
                        <Avatar.Image {...avatarProps}/>
                        <DisplayText size={20} tt>{user.name} </DisplayText>
                        <DisplayText size={15} >{user.email?user.email:'Email Id not mentioned'} </DisplayText>
                        <DisplayText size={16}> <Gem /> &ensp; {user.gems?user.gems:''} </DisplayText>
                    </ProfileTop>
                    <DisplayText>Practice Mode Statistics </DisplayText>
                    { userDataCheck() }
                    <DisplayText>Challenge Mode Statistics </DisplayText>
                    { userDataCheck2() }
                    <Row mb={20}>
                        <WhiteButton color={theme.colors.white} mode="contained" onPress={()=>setMode('edit')} size={13}> Edit </WhiteButton>
                        <WhiteButton color={theme.colors.white} mode="contained" onPress={onLogoutClick} size={13}> Logout </WhiteButton>
                    </Row>
                </MainScrollView>
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