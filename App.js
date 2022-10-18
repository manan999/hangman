import { useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper' ;
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import {useFonts as useKufam, Kufam_400Regular} from '@expo-google-fonts/kufam' ;
import {useFonts as useLexend, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold} from '@expo-google-fonts/lexend' ;
import {useFonts as useMont, Montserrat_400Regular} from '@expo-google-fonts/montserrat' ;

import GameScreen from './src/screens/game/GameScreen.js' ;
import ResultScreen from './src/screens/result/ResultScreen.js' ;
import HomeScreen from './src/screens/home/HomeScreen.js' ;
import AboutScreen from './src/screens/about/AboutScreen.js' ;
import HighScoreScreen from './src/screens/highscore/HighScoreScreen.js' ;
import ProfileScreen from './src/screens/profile/ProfileScreen.js' ;
import TutorialScreen from './src/screens/tutorial/TutorialScreen.js' ;
import SettingsScreen from './src/screens/settings/SettingsScreen.js' ;
import ShopScreen from './src/screens/shop/ShopScreen.js' ;
import TopicScreen from './src/screens/topic/TopicScreen.js' ;
import SafeArea from './src/comps/safearea/SafeArea.js' ;
import { theme } from './src/theme.js' ;
import { UserContextProvider } from './src/context/UserContext.js' ;
import { MainView } from './cssApp.js' ;

export default function App() {
  let [kufamLoaded] = useKufam({ Kufam_400Regular });
  let [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_500Medium, Lexend_700Bold });
  let [montLoaded] = useMont({ Montserrat_400Regular});

  useEffect( () => {
    console.log('app loaded on '+ new Date())
    mobileAds()
    .setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
      // An array of test device IDs to allow.
      testDeviceIdentifiers: ['EMULATOR'],
    })
    .initialize()
    .then( initData => {
      console.log(initData) ;
    });
  }, [])

  const Stack = createNativeStackNavigator() ;
  
  const screenOptions = {
    animation: 'slide_from_right' ,
    presentation: 'modal',
  }

  const fontsLoaded = [kufamLoaded, montLoaded, lexendLoaded].every(one => one) ;

  const returnRoutes = () => {
    if( !fontsLoaded )
        return <MainView white><ActivityIndicator color="#1d2951" size="large" /></MainView> ;
    else
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Result" component={ResultScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Shop" component={ShopScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="HighScore" component={HighScoreScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Tutorial" component={TutorialScreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Topic" component={TopicScreen} options={{headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        ) ;
    }

    return (
      <>
        <UserContextProvider>
          <PaperProvider>
            <ThemeProvider theme={theme}>
            <SafeArea>
                {returnRoutes()}           
            </SafeArea>
            </ThemeProvider>
          </PaperProvider>
        </UserContextProvider>
        <StatusBar style="auto" />
      </>
    ) ;
}