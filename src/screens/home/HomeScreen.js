import { useContext, useEffect, useState, useCallback } from 'react' ;
import { View, Dimensions, ToastAndroid, BackHandler } from 'react-native' ;
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av' ;
import { useFocusEffect } from '@react-navigation/native';

import CircleButton from '../../comps/circlebutton/CircleButton.js' ;
import { Row } from '../../../cssApp.js' ;
import { MainView, SubText, HomeButton, HomeImage } from './cssHomeScreen.js' ;
import { theme } from '../../theme.js' ;
import sky from '../../../assets/sky.json' ;
import { UserContext } from '../../context/UserContext.js' ;

const HomeScreen = ({navigation}) => {
    const [sound, setSound] = useState() ;
    const {user, addGems} = useContext(UserContext) ;
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
        // playSound() ;
    }, [])


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

    const returnHSButton = () => {
        return (
            <CircleButton onButtonPress={()=>{
                if(user.name)
                    navigation.navigate('HighScore', {}) ;
                else
                    ToastAndroid.show("Login to see High Scores", ToastAndroid.SHORT)
            }} size={45}>
                <MaterialCommunityIcons name="podium" size={25} color={theme.colors.main} />
            </CircleButton>
        ) ;
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
            <HomeButton dark={true} color={theme.colors.darkGreen} icon="notebook" mode="contained" onPress={() => navigation.navigate('Tutorial')}>
                How To Play
            </HomeButton>
        </View>
        <Row>
            <CircleButton onButtonPress={()=>navigation.navigate('About')} size={45}>
                <FontAwesome5 name="info" size={25} color={theme.colors.main} />
            </CircleButton>
            { returnUserButton() }
            { returnHSButton() }
            {/*<CircleButton onButtonPress={()=>navigation.navigate('Settings')} size={45}>
                <FontAwesome name="gear" size={25} color={theme.colors.main} />
            </CircleButton>*/}
            <CircleButton onButtonPress={()=>navigation.navigate('Shop')} size={45}>
                <FontAwesome name="shopping-cart" size={25} color={theme.colors.main} />
            </CircleButton>
        </Row>
      </MainView>
    ) ;
}

export default HomeScreen ;
    // useEffect( async () => {

    //     // const song = new Audio.Sound();
    //     // await song.loadAsync(require('../../../assets/one_2.mp3'));
    //     // await song.playAsync();   

        // await song.setAudioModeAsync({
        //     staysActiveInBackground: false,
        //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        //     shouldDuckAndroid: true,
        //     playThroughEarpieceAndroid: true,
        //     allowsRecordingIOS: true,
        //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        //     playsInSilentModeIOS: true,
        //   });

    //     // return (async () => {
    //     //   let abc = await song.unloadAsync() ;
    //     //   console.log(abc) ;
    //     // }) 
    // }, [])