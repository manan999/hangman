import {View} from 'react-native' ;

import {MainView, HomeButton, HomeImage} from './cssHomeScreen.js' ;

const HomeScreen = ({navigation}) => {
    return (
      <MainView>
        <HomeImage source={require('../../../assets/AurBatao.png')} />
        <View>
          <HomeButton dark={true} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game', {rounds: 100})}>
            Challenge
          </HomeButton>
          <HomeButton dark={true} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game', {rounds: 10})}>
            Practice
          </HomeButton>
        </View>
      </MainView>
    ) ;
}

export default HomeScreen ;