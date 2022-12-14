import { useContext, useEffect, useState, useCallback } from 'react' ;
import { View, Dimensions, BackHandler, Linking } from 'react-native' ;
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
// import { Audio } from 'expo-av' ;
import { useFocusEffect } from '@react-navigation/native';
import * as Application from 'expo-application';

import Popup from '../../comps/popup/Popup.js' ;
import CircleButton from '../../comps/circlebutton/CircleButton.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;
import sky from '../../../assets/sky.json' ;
import { Row } from '../../../cssApp.js' ;
import { MainView, SubText, HomeButton, HomeImage, FloatLeft } from './cssHomeScreen.js' ;
import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { SignUpPop, UpdatePop } from './homePopups.js' ;

const Bubble = ({name, onPress}) => {
    return ( 
         <AnimateView anim="wobble" delay={0} iterationCount="infinite">
            <CircleButton onButtonPress={onPress} size={45} bgColor={theme.colors.halfBlack}>
                <FontAwesome5 name={name} size={20} color={theme.colors.white} />
            </CircleButton>
        </AnimateView>
    ) ;
}

const HomeScreen = ({navigation, route}) => {
    const [popOpen, setPopOpen] = useState(false) ;
    const [popContent, setPopContent] = useState('signup') ;
    const [sound, setSound] = useState() ;
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
        // playSound() ;
    }, [])

    useEffect( () => {
        if(Application.nativeBuildVersion < gameData.versionCode) {
            setPopContent('update') ;
            setPopOpen(true) ;
        }

    }, [gameData])

    // useEffect(() => {
    //     return sound? () => {
    //           console.log('Unloading Sound');
    //           sound.unloadAsync(); }
    //       : undefined;
    // }, [sound]);

    // const playSound = async () => {
    //     try {
    //     console.log('Loading Sound');
    //     const { sound } = await Audio.Sound.createAsync(
    //        require('../../../assets/success.mp3')
    //     );
    //     setSound(sound);
    //     await sound.setIsLoopingAsync(true) ;

    //     console.log('Playing Sound');
    //     await sound.playAsync(); 
    //     } catch (e) {
    //         console.log(e) ;
    //     }
    // }

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
            style : { backgroundColor: theme.colors.white},
            size : 41,
            source : {uri: user.image},
        }

        return (
            <CircleButton onButtonPress={()=>navigation.navigate('Profile')} size={45}>
                {   user.name?
                    <Avatar.Image {...avatarProps} />:
                    <FontAwesome name="user" size={25} color={theme.colors.main} />
                }
            </CircleButton>
        ) ;
    }

    const returnGreeting = () => {
        if(user.name)
            return <SubText mt={25} bold> Welcome, {user.name.slice(0, 1).toUpperCase()}{user.name.slice(1)} </SubText>
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
        <View>
            <HomeImage source={require('../../../assets/AurBatao.png')} />
            <SubText> THE GUESSING GAME </SubText>
            { returnGreeting() }
        </View>
        <View>
            <HomeButton dark={true} color={theme.colors.main} icon="fire" mode="contained" onPress={() => navigation.replace('Topic', {mode: 'challenge'})}>
                Challenge
            </HomeButton>
            <HomeButton dark={true} color={theme.colors.main} icon="gamepad" mode="contained" onPress={() => navigation.replace('Topic', {mode: 'practice'})}>
                Practice
            </HomeButton>
            <HomeButton dark={true} color={theme.colors.darkGreen} icon="notebook" mode="contained" onPress={()=> Linking.openURL('https://www.youtube.com/watch?v=BENuLeGwIrw')}>
                How To Play
            </HomeButton>
        </View>
        <Row>
            <CircleButton onButtonPress={()=>navigation.navigate('About')} size={45}>
                <FontAwesome5 name="info" size={25} color={theme.colors.main} />
            </CircleButton>
            { returnUserButton() }
            <CircleButton onButtonPress={()=>navigateIfUser('HighScore')} size={45}>
                <MaterialCommunityIcons name="podium" size={25} color={theme.colors.main} />
            </CircleButton>
            <CircleButton onButtonPress={()=>navigateIfUser('Shop')} size={45}>
                <FontAwesome name="shopping-cart" size={25} color={theme.colors.main} />
            </CircleButton>
            {/*<CircleButton onButtonPress={()=>navigation.navigate('Settings')} size={45}>
                <FontAwesome name="gear" size={25} color={theme.colors.main} />
            </CircleButton>*/}
        </Row>
        <FloatLeft>{FloatLeftContent()}</FloatLeft>
        <Popup visible={popOpen} onClose={() => setPopOpen(false)} thin>{popContents[popContent]}</Popup>
      </MainView>
    ) ;
}

export default HomeScreen ;