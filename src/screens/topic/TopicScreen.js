import { useState, useCallback, useContext } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { View, BackHandler } from 'react-native' ;

import Popup from '../../comps/popup/Popup.js' ;
import { MainView, KufamText, BlackKufam} from '../../../cssApp.js' ;
import { GreenButton } from '../game/cssGameScreen.js' ;
import { theme } from '../../theme.js' ;
import { TopicButton } from './cssTopic.js' ;
import { UserContext } from '../../context/UserContext.js' ;

const TopicScreen = ({navigation, route}) => {
    const [popOpen, setPopOpen] = useState(false) ;
    const {mode} = route.params ;
    const {topics} = useContext(UserContext) ;

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                setPopOpen(true) ;
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [popOpen, setPopOpen])
    );

    return (
        <MainView>
            <Animatable.View iterationCount={4} animation="bounce">
                <KufamText> Select your Topic </KufamText>
            </Animatable.View>
            <View>
            { 
                Object.keys(topics).map(one => <TopicButton key={one} dark={false} color={theme.colors.white} icon={topics[one].icon} mode="contained" onPress={() => navigation.replace('Game', {mode, topic: one})}>{one}</TopicButton>) 
            }
            </View>
            <Popup visible={popOpen} onClose={() => setPopOpen(false)}>
                <BlackKufam size={20}> Cancel Topic Selection ? </BlackKufam>
                <GreenButton dark={false} icon="check" mode="contained" onPress={() => navigation.replace('Home')}> Yes </GreenButton>
            </Popup>
        </MainView>
    ) ;
}

export default TopicScreen ;