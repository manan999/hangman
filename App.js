import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper' ;
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons' ;

import {useFonts as useKufam, Kufam_400Regular} from '@expo-google-fonts/kufam' ;
import {useFonts as useLexend, Lexend_400Regular, Lexend_500Medium} from '@expo-google-fonts/lexend' ;
import {useFonts as useMont, Montserrat_400Regular} from '@expo-google-fonts/montserrat' ;

// import AboutUs from './src/pages/AboutUs.js' ;
// import ProductNavigator from './src/pages/ProductNavigation.js' ;
// import { CartContextProvider } from './src/comps/CartContext.js' ;
import GameScreen from './src/screens/game/GameScreen.js' ;
import LossScreen from './src/screens/loss/LossScreen.js' ;
import WinScreen from './src/screens/win/WinScreen.js' ;
import HomeScreen from './src/screens/home/HomeScreen.js' ;
import SafeArea from './src/comps/safearea/SafeArea.js' ;
import { theme } from './src/theme.js' ;

export default function App() {
  let [kufamLoaded] = useKufam({ Kufam_400Regular });
  let [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_500Medium  });
  let [montLoaded] = useMont({ Montserrat_400Regular});

  useEffect( () => console.log('app loaded on '+ new Date()), [])

  // const Settings = () => {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Settings!</Text>
  //     </View>
  //   );
  // }

  const Stack = createNativeStackNavigator() ;
  
  const screenOptions = {
    animation: 'slide_from_right' ,
    presentation: 'modal',
  }

  if( !kufamLoaded || !montLoaded || !lexendLoaded)
    return (
      <>
        <Text> Loading... </Text>
      </>
    ) ;
  else
    return (
      <>
        <ThemeProvider theme={theme}>
          <SafeArea>
            <NavigationContainer>
              <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Loss" component={LossScreen} options={{headerShown: false }}/>
                <Stack.Screen name="Win" component={WinScreen} options={{headerShown: false }}/>
              </Stack.Navigator>
            </NavigationContainer> 
          </SafeArea>
        </ThemeProvider>
        <StatusBar style="auto" />
      </>
    );
}