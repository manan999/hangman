import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper' ;

import {useFonts as useKufam, Kufam_400Regular} from '@expo-google-fonts/kufam' ;
import {useFonts as useLexend, Lexend_400Regular, Lexend_500Medium} from '@expo-google-fonts/lexend' ;
import {useFonts as useMont, Montserrat_400Regular} from '@expo-google-fonts/montserrat' ;

import GameScreen from './src/screens/game/GameScreen.js' ;
import ResultScreen from './src/screens/result/ResultScreen.js' ;
import HomeScreen from './src/screens/home/HomeScreen.js' ;
import AboutScreen from './src/screens/about/AboutScreen.js' ;
import HighScoreScreen from './src/screens/highscore/HighScoreScreen.js' ;
import ProfileScreen from './src/screens/profile/ProfileScreen.js' ;
import TutorialScreen from './src/screens/tutorial/TutorialScreen.js' ;
import SettingsScreen from './src/screens/settings/SettingsScreen.js' ;
import SafeArea from './src/comps/safearea/SafeArea.js' ;
import { theme } from './src/theme.js' ;
import { UserContextProvider } from './src/context/UserContext.js' ;

export default function App() {
  let [kufamLoaded] = useKufam({ Kufam_400Regular });
  let [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_500Medium  });
  let [montLoaded] = useMont({ Montserrat_400Regular});

  useEffect( () => console.log('app loaded on '+ new Date()), [])

  const Stack = createNativeStackNavigator() ;
  
  const screenOptions = {
    animation: 'slide_from_right' ,
    presentation: 'modal',
  }

  const fontsLoaded = [kufamLoaded, montLoaded, lexendLoaded].every(one => one) ;

  if( !fontsLoaded )
    return (
      <>
        <Text> Loading... </Text>
      </>
    ) ;
  else
    return (
      <>
        <UserContextProvider>
          <PaperProvider>
            <ThemeProvider theme={theme}>
            <SafeArea>
              <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptions}>
                  <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="Result" component={ResultScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="HighScore" component={HighScoreScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false }}/>
                  <Stack.Screen name="Tutorial" component={TutorialScreen} options={{headerShown: false }}/>
                </Stack.Navigator>
              </NavigationContainer> 
            </SafeArea>
            </ThemeProvider>
          </PaperProvider>
        </UserContextProvider>
        <StatusBar style="auto" />
      </>
    );
}