import { useState, useCallback, useContext } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { View, BackHandler } from 'react-native' ;

import Popup from '../../comps/popup/Popup.js' ;
import { MainView, GreenButton, P, Button } from '@comps' ;
import { UserContext } from '../../context/UserContext.js' ;

const TopicScreen = ({navigation, route}) => {
    const [popOpen, setPopOpen] = useState(false) ;
    const {mode} = route.params ;
    const {topics} = useContext(UserContext) ;

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                setPopOpen(true);
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [popOpen, setPopOpen])
    );

    return (
        <MainView jc="center" rowGap={24}>
            <Animatable.View iterationCount={4} animation="bounce">
                <P color="white"> Select your Topic </P>
            </Animatable.View>
            <View>
            { 
                Object.keys(topics).map(one => <Button key={one} buttonColor="white" color="main" jc="flex-start" size={18} icon={topics[one].icon} mode="contained" onPress={() => navigation.replace('Game', {mode, topic: one})}>{one}</Button>) 
            }
            </View>
            <Popup visible={popOpen} onClose={() => setPopOpen(false)}>
                <P size={20}> Cancel Topic Selection ? </P>
                <GreenButton buttonColor="darkGreen" mw={100} icon="check" mode="contained" onPress={() => navigation.replace('Home')}> Yes </GreenButton>
            </Popup>
        </MainView>
    ) ;
}

export default TopicScreen ;