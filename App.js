import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native' ;
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons' ;

import {useFonts as useKufam, Kufam_400Regular} from '@expo-google-fonts/kufam' ;
import {useFonts as useLexend, Lexend_400Regular, Lexend_500Medium} from '@expo-google-fonts/lexend' ;
import {useFonts as useMont, Montserrat_400Regular} from '@expo-google-fonts/montserrat' ;

// import ProductPage from './src/pages/ProductPage.js' ;
// import AboutUs from './src/pages/AboutUs.js' ;
// import ProductNavigator from './src/pages/ProductNavigation.js' ;
// import { CartContextProvider } from './src/comps/CartContext.js' ;
import { theme } from './src/theme.js' ;

export default function App() {
  console.log('app loaded on'+ new Date()) ;
  let [kufamLoaded] = useKufam({ Kufam_400Regular });
  let [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_500Medium  });
  let [montLoaded] = useMont({ Montserrat_400Regular});

  // const Settings = () => {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Settings!</Text>
  //     </View>
  //   );
  // }

  // const Tab = createBottomTabNavigator();

  // const screenOptions = ({route}) => ({
  //   tabBarIcon: ({ color, size }) => {
  //     switch(route.name) {
  //       case 'ProductScreen' : return <FontAwesome5 name="cart-plus" size={size} color={color} /> ;
  //       case 'Settings' : return <MaterialIcons name="settings" size={size} color={color} /> ;
  //       case 'About Us' : return <FontAwesome5 name="info-circle" size={size} color={color} /> ;
  //       default : return <FontAwesome5 name="question" size={size} color={color} />; 
  //     }
  //   },
  //   tabBarActiveTintColor: '#e66910',
  //   tabBarInactiveTintColor: 'gray',
  // }) ;

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
          <Text> Loading... </Text>
          {/*<CartContextProvider> 
          <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions} initialRouteName="ProductScreen">
              <Tab.Screen name="About Us" component={AboutUs} />
              <Tab.Screen name="ProductScreen" component={ProductNavigator} options={{headerShown: false}}/>
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </NavigationContainer> 
          </CartContextProvider>*/}
        </ThemeProvider>
        <StatusBar style="auto" />
      </>
    );
}