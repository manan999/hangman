import {MainView, HomeButton} from './cssHomeScreen.js' ;

const HomeScreen = ({navigation}) => {
    return (
      <MainView>
        <HomeButton dark={true} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game', {rounds: 1})}>
          Play Single
        </HomeButton>
        <HomeButton dark={true} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game', {rounds: 10})}>
          Play Tens
        </HomeButton>
      </MainView>
    ) ;
}

export default HomeScreen ;