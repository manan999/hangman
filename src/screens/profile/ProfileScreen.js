import { useState, useEffect, useContext } from 'react' ;
import { View, Dimensions, Keyboard, ToastAndroid } from 'react-native' ;
import { Snackbar, TextInput, Avatar } from 'react-native-paper' ;
import LottieView from 'lottie-react-native';

import { P } from '@comps' ;
import Img from '../../comps/img/Img.js' ;
import AvatarChoice from '../../comps/avatarchoice/AvatarChoice.js' ;
import { Row, Button, Shrink, MainView, GreenView, MainScrollView } from '../../../cssApp.js' ;
import { MainView2, ProfileView, ProfileText, DisplayText, ProfileTop } from './cssProfile.js' ;
import { invalidEmail, invalidPass, isBlank } from '../../comps/valid.js' ;
import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { Gem } from '../../comps/icons.js' ;
import sky from '../../../assets/sky.json' ;

const initObj = {
    login: { name: '', password: '' },
    register: { name: '', email : '', password: '', repass: '', image: `https://api.myarth.in/static/hangman/avatar/17.webp` }, 
};

const ProfileScreen = ({navigation, route}) => {
    const [mode, setMode] = useState(route.params?route.params.mode:'login') ;
    const [data, setData] = useState(initObj.login) ;
    const [logo, setLogo] = useState(true) ;
    const [hidePass, setHidePass] = useState({password: true, repass: true}) ;
    const [error, setError] = useState([]) ;
    const [errorCount, setErrorCount] = useState(null) ;
    const [userData, setUserData] = useState({}) ;    

    const {user, loadUser, userToken, fetchUrl} = useContext(UserContext) ;
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
            fetch(`${fetchUrl}users/me` ,{
                method : 'get',
                headers : { 'Content-Type' : 'application/json' , 'Authorization': `Bearer ${userToken}`},
            })
            .then(res =>  res.json())
            .then(data => {
                // console.log(data, 'data') ;
                const arr = data.filter(one => one.mode === 'practice') ;
                const practiceTotal = arr.length ;
                let userObj = {} ;
                
                if(practiceTotal > 0) {
                    let totalScore = 0 ;
                    let totalHints = 0 ;
                    const totalTopics = {} ;
                    arr.forEach((one,i) => {
                        totalHints += one.hints ;
                        totalScore += one.score ;
                        if(totalTopics[one.topic])
                            totalTopics[one.topic]++ ;
                        else
                            totalTopics[one.topic] = 1 ;
                    })
                    Object.keys(totalTopics).forEach(one=>{totalTopics[one] = Math.round(totalTopics[one]*100/practiceTotal)})

                    const practiceAvgScore = Math.floor(totalScore/practiceTotal) ; 
                    const practiceAvgHints = Math.floor(totalHints/practiceTotal) ; 
                    userObj = {totalHints, totalScore, practiceAvgScore, practiceAvgHints, totalTopics, ...userObj} ;
                }

                const arr2 = data.filter(one => one.mode === 'challenge') ;
                const challTotal = arr2.length ;
                
                if(challTotal > 0) {
                    let challTotalScore = 0 ;
                    let challTotalHints = 0 ;
                    const challTotalTopics = {} ;

                    arr2.forEach((one,i) => {
                        challTotalHints += one.hints ;
                        challTotalScore += one.score ;
                        if(challTotalTopics[one.topic])
                            challTotalTopics[one.topic]++ ;
                        else
                            challTotalTopics[one.topic] = 1 ; 
                    })

                    Object.keys(challTotalTopics).forEach(one => {challTotalTopics[one] = Math.round(challTotalTopics[one]*100/challTotal)})

                    const challAvgScore = Math.floor(challTotalScore/challTotal) ; 
                    const challAvgHints = Math.floor(challTotalHints/challTotal) ;
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

        fetch(`${fetchUrl}login` ,{
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

        fetch(`${fetchUrl}users` ,{
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

        fetch(`${fetchUrl}users/me` ,{
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

        fetch(`${fetchUrl}logout` ,{
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
            
            const obj = {
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
        const errorArr = [isBlank(name, 'Username'), invalidEmail(email), invalidPass(password, repass)].filter(one => one) ;

        setError(errorArr) ;
        setErrorCount(errorArr.length) ;
    }

     const onEditPress = () => {
        const {name, email} = data;
        const errorArr = [isBlank(name, 'Username'), invalidEmail(email)].filter(one => one) ;

        setError(errorArr) ;
        setErrorCount(errorArr.length) ;
    }

    const returnLogo = () => {
        if(logo)
            return (
                <View>
                    <Img src={require('../../../assets/AurBatao.png')} max={0.95} />
                    <P size={20} > THE GUESSING GAME </P>
                </View>
            ) ;
    }

    const returnAvatarChoice = () => {
        const arrData = user.settings?[17, 18, 19, 20, ...user.settings.avatars]:[17, 18, 19, 20] ;
        if(logo || mode === 'edit')
            return <AvatarChoice url={data.image} setUrl={ url => setData({...data, image: url})} data={arrData}/> ;
    }

    // const returnSignInText = () => {
    //     if(logo)
    //         return (
    //             <Row>
    //                 <ProfileText size={14}> Already have an Account? </ProfileText>
    //                 <Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={()=>setMode('login')} size={13}> Sign In </Button>
    //             </Row>
    //         ) ;
    // }

    const checkMode = () => {
        if(mode === 'login') {
            return ( 
                <>
                    { returnLogo() }
                    <ProfileView>
                        <ProfileText size={20}> Sign In </ProfileText>
                        { returnForm() }
                        <Shrink><Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={onLoginPress}> Login </Button></Shrink>
                        {/*<MarginRow>
                            <TouchableOpacity onPress={() => ToastAndroid.show("Coming Soon !", ToastAndroid.SHORT)}>
                                <ProfileText size={14}> Forgot Password? </ProfileText>
                            </TouchableOpacity>
                        </MarginRow>*/}
                        <Row>
                            <ProfileText size={14}> Don't have an Account? </ProfileText>
                            <Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={()=>setMode('register')} size={13}> Sign Up </Button>
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
                        <Shrink><Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={onRegisterPress}> Confirm </Button></Shrink>
                        <Row>
                            <ProfileText size={14}> Already have an Account? </ProfileText>
                            <Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={()=>setMode('login')} size={13}> Sign In </Button>
                        </Row>
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
                        {Object.keys(userData.totalTopics).map((one,i)=><Row jc="space-between" key={i}><DisplayText size={15}>{one}</DisplayText><DisplayText size={15}>{userData.totalTopics[one]}%</DisplayText></Row>)}
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
                        {Object.keys(userData.challTotalTopics).map((one,i)=><Row jc="space-between" key={i}><DisplayText size={15}>{one}</DisplayText><DisplayText size={15}>{userData.challTotalTopics[one]}%</DisplayText></Row>)}
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
                        <Shrink><Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={onEditPress}> Submit </Button></Shrink>
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
                        <Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={()=>setMode('edit')} size={13}> Edit Profile </Button>
                    </ProfileTop>
                    <DisplayText>Practice Mode Statistics </DisplayText>
                    { userDataCheck() }
                    <DisplayText>Challenge Mode Statistics </DisplayText>
                    { userDataCheck2() }
                    <Row mb={20}>
                        <Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={()=>setMode('edit')} size={13}> Edit </Button>
                        <Button buttonColor={theme.colors.white} color={theme.colors.main} mw={100} mode="contained" onPress={onLogoutClick} size={13}> Logout </Button>
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