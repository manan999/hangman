import { useContext, useEffect, useState/*, useCallback*/ } from 'react' ;
import { View, Dimensions, /*BackHandler,*/ Linking } from 'react-native' ;
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
// import { useFocusEffect } from '@react-navigation/native';
import * as Application from 'expo-application';
import styled from 'styled-components/native' ;

import { Img, Popup, CircleButton, AnimateView, Row, Button, P, MainView } from '@comps' ;
import { sky } from '@images' ;
import { theme } from '@theme' ;
import { UserContext } from '@uc' ;
import { SignUpPop, UpdatePop } from './homePopups.js' ;

const { white, main, halfBlack, darkGreen } = theme.colors ;

const Bubble = ({name, onPress}) => {
    return ( 
         <AnimateView anim="wobble" delay={0} iterationCount="infinite">
            <CircleButton onButtonPress={onPress} size={45} bgColor={halfBlack}>
                <FontAwesome5 name={name} size={20} color={white} />
            </CircleButton>
        </AnimateView>
    ) ;
}

const HomeScreen = ({navigation, route}) => {
    const [popOpen, setPopOpen] = useState(false) ;
    const [popContent, setPopContent] = useState('signup') ;
    const {user, addGems, gameData} = useContext(UserContext) ;
    const windowHeight = Dimensions.get('window').height;
    
    // useFocusEffect(
    //     useCallback(() => {
    //         const onBackPress = () => {
    //             setSound(false) ;
    //             BackHandler.exitApp() ;
    //             return true;
    //         };

    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);
    //         return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, [setSound])
    //  );

    useEffect( () => {
        if(user.name)
            addGems(0) ;
        else {
            if(route.params && route.params.popOpen)
                setPopOpen(route.params.popOpen)
        }
    }, [])

    useEffect( () => {
        // if(Application.nativeBuildVersion < gameData.versionCode) {
            setPopContent('update') ;
            setPopOpen(true) ;
        // }

    }, [gameData])

    const FloatLeftContent = () => {
        if(user.name)
            return <Bubble name="gem" onPress={()=>navigation.navigate('Shop')} /> ;
        else
            return <Bubble name="user-plus" onPress={()=>{
                setPopContent('signup') ;
                setPopOpen(true) ;
            }} /> ;
    }

    const returnUserButton = () => {
        const avatarProps = {
            style : { backgroundColor: white},
            size : 41,
            source : {uri: user.image},
        }

        return (
            <CircleButton onButtonPress={()=>navigation.navigate('Profile')} size={45}>
                {   user.name?
                    <Avatar.Image {...avatarProps} />:
                    <FontAwesome name="user" size={25} color={main} />
                }
            </CircleButton>
        ) ;
    }

    const returnGreeting = () => {
        if(user.name)
            return <P size={20} font="mainThick" > Welcome, {user.name.slice(0, 1).toUpperCase()}{user.name.slice(1)} </P>
    }

    const navigateIfUser = (to) => {
        if(user.name)
            navigation.navigate(to, {}) ;
        else {
            setPopContent('signup') ;
            setPopOpen(true) ;
        }
    }

    const onSignUpPress = () => {
        setPopOpen(false) ;
        navigation.navigate('Profile', {mode: 'register'}) ;
    }

    const popContents = {
        signup: <SignUpPop onSignUpPress={onSignUpPress} />,
        update: <UpdatePop />,
    }

    return (
      <MainView>
        <LottieView style={{height: windowHeight, position: 'absolute', top: 0}} source={sky} autoPlay loop />
        <HomeTop>
            <Img src={require('../../../assets/AurBatao.png')} max={0.95} />
            <P size={20} > THE GUESSING GAME </P>
            { returnGreeting() }
        </HomeTop>
        <View>
            {/*<LevelButton color={white} icon="fire" mode="contained" onPress={() => console.log('played') }>
                Play
            </LevelButton>*/}
            <Button color={white} icon="fire" mode="contained" onPress={() => navigation.replace('Topic', {mode: 'challenge'})}>
                Challenge
            </Button>
            <Button color={white} icon="gamepad" mode="contained" onPress={() => navigation.replace('Topic', {mode: 'practice'})}>
                Practice
            </Button>
            <Button buttonColor={darkGreen} color={white} icon="notebook" mode="contained" onPress={()=> Linking.openURL('https://www.youtube.com/watch?v=BENuLeGwIrw')}>
                How To Play
            </Button>
        </View>
        <Row>
            { returnUserButton() }
            <CircleButton onButtonPress={()=>navigateIfUser('HighScore')} size={45}>
                <MaterialCommunityIcons name="podium" size={25} color={main} />
            </CircleButton>
            <CircleButton onButtonPress={()=>navigateIfUser('Shop')} size={45}>
                <FontAwesome name="shopping-cart" size={25} color={main} />
            </CircleButton>
            <CircleButton onButtonPress={()=>navigation.navigate('Settings')} size={45}>
                <FontAwesome name="gear" size={25} color={main} />
            </CircleButton>
            {/*<CircleButton onButtonPress={()=>navigation.navigate('About')} size={45}>
                <FontAwesome5 name="info" size={25} color={main} />
            </CircleButton>*/}
        </Row>
        <FloatLeft>{FloatLeftContent()}</FloatLeft>
        <Popup visible={popOpen} onClose={() => setPopOpen(false)} thin>{popContents[popContent]}</Popup>
      </MainView>
    ) ;
}

export default HomeScreen ;

const FloatLeft = styled.View` 
  position: absolute ;
  height: 100% ;
  left: 10px ;
  justify-content: center ; 
 ` ;

const HomeTop = styled.View` 
    gap: 18px ;
 ` ;