import { Text } from 'react-native';

import {MainView, HomeButton} from './cssHomeScreen.js' ;

const HomeScreen = ({navigation}) => {
    return (
      <MainView>
        <HomeButton dark={true} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game')}>
          Play Game
        </HomeButton>
      </MainView>
    ) ;
}

export default HomeScreen ;