import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper' ;
import { Audio } from 'expo-av';
import {useFonts as useKufam, Kufam_400Regular} from '@expo-google-fonts/kufam' ;
import {useFonts as useLexend, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold} from '@expo-google-fonts/lexend' ;
import {useFonts as useMont, Montserrat_400Regular} from '@expo-google-fonts/montserrat' ;
// import AsyncStorage from '@react-native-async-storage/async-storage' ;

import GameScreen from './src/screens/game/GameScreen.js' ;
import ResultScreen from './src/screens/result/ResultScreen.js' ;
import HomeScreen from './src/screens/home/HomeScreen.js' ;
import HighScoreScreen from './src/screens/highscore/HighScoreScreen.js' ;
import ProfileScreen from './src/screens/profile/ProfileScreen.js' ;
import SettingsScreen from './src/screens/settings/SettingsScreen.js' ;
import ShopScreen from './src/screens/shop/ShopScreen.js' ;
import TopicScreen from './src/screens/topic/TopicScreen.js' ;
import SafeArea from './src/comps/safearea/SafeArea.js' ;
import { theme } from './src/theme.js' ;
import { UserContextProvider, UserContext } from './src/context/UserContext.js' ;
import { MainView } from './cssApp.js' ;

const AppRoutes = () => {
    const [sound, setSound] = useState();

    const {settings} = useContext(UserContext) ;

    useEffect(() => {
        return sound? () => {
            // console.log('Unloading Sound');
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    const playSound = async () => {
        // console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('./assets/one.mp3'), {
            isLooping: true,
            volume: 0.5,
        } );
        setSound(sound);

        // console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect( () => {
        console.log('app loaded on '+ new Date()) ;
    }, [])

    useEffect( () => {
        if(settings && settings.music)
            playSound() ;
        else
            if(sound)
                sound.unloadAsync() ;
    }, [settings])

    const Stack = createNativeStackNavigator() ;
  
    const screenOptions = {
        animation: 'slide_from_right' ,
        presentation: 'modal',
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Result" component={ResultScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Shop" component={ShopScreen} options={{headerShown: false }}/>
                <Stack.Screen name="HighScore" component={HighScoreScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Topic" component={TopicScreen} options={{headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    ) ;
}

export default function App() {
    const [kufamLoaded] = useKufam({ Kufam_400Regular });
    const [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_500Medium, Lexend_700Bold });
    const [montLoaded] = useMont({ Montserrat_400Regular});

    const fontsLoaded = [kufamLoaded, montLoaded, lexendLoaded].every(one => one) ;

    return (
        <>
            <UserContextProvider>
                <PaperProvider>
                    <ThemeProvider theme={theme}>
                        <SafeArea>
                            {   !fontsLoaded?
                                <MainView white><ActivityIndicator color="#1d2951" size="large" /></MainView>
                                :<AppRoutes /> 
                            }
                        </SafeArea>
                    </ThemeProvider>
                </PaperProvider>
            </UserContextProvider>
            <StatusBar style="auto" />
        </>
    ) ;
}