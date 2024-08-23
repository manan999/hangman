import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper' ;
import { Audio } from 'expo-av';
import { useFonts as useKufam, Kufam_400Regular } from '@expo-google-fonts/kufam' ;
import { useFonts as useLexend, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold } from '@expo-google-fonts/lexend' ;
import { useFonts as usePop, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins' ;
import { useFonts as useMont, Montserrat_400Regular } from '@expo-google-fonts/montserrat' ;
// import AsyncStorage from '@react-native-async-storage/async-storage' ;

import { GameScreen, ResultScreen, HomeScreen, HighScoreScreen, ProfileScreen, SettingsScreen, ShopScreen, TopicScreen } from '@screens' ;
import { SafeArea, MainView } from '@comps' ;
import { theme } from '@theme' ;
import { UserContextProvider, UserContext } from '@uc' ;

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

    useEffect( () => console.log('app loaded on '+ new Date()), [])

    useEffect( () => {
        if(settings && settings.music)
            playSound() ;
        else
            if(sound)
                sound.unloadAsync() ;
    }, [settings])

    const Stack = createNativeStackNavigator() ;
  
    const screenOptions = { animation: 'slide_from_right', presentation: 'modal' } ;
    const options = { headerShown: false } ;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={HomeScreen} options={options}/>
                <Stack.Screen name="Game" component={GameScreen} options={options}/>
                <Stack.Screen name="Result" component={ResultScreen} options={options}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={options}/>
                <Stack.Screen name="Shop" component={ShopScreen} options={options}/>
                <Stack.Screen name="HighScore" component={HighScoreScreen} options={options}/>
                <Stack.Screen name="Profile" component={ProfileScreen} options={options}/>
                <Stack.Screen name="Topic" component={TopicScreen} options={options}/>
            </Stack.Navigator>
        </NavigationContainer>
    ) ;
}

export default function App() {
    const [kufamLoaded] = useKufam({ Kufam_400Regular });
    const [lexendLoaded] = useLexend({ Lexend_400Regular, Lexend_500Medium, Lexend_700Bold });
    const [montLoaded] = useMont({ Montserrat_400Regular});
    const [popLoaded] = usePop({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold});

    const fontsLoaded = [kufamLoaded, montLoaded, lexendLoaded, popLoaded].every(one => one) ;

    return (
        <>
            <UserContextProvider>
                <PaperProvider>
                    <ThemeProvider theme={theme}>
                        <SafeArea>
                            {   !fontsLoaded?
                                <MainView color="white"><ActivityIndicator color="#1d2951" size="large" /></MainView>
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