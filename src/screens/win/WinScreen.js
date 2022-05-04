import {MainView} from './cssWinScreen.js' ;
import {WhiteButton, KufamText} from '../../../cssApp.js' ;

const WinScreen = ({navigation}) => {
    return (
      <MainView>
        <KufamText>Wow... You Won</KufamText>
         <WhiteButton dark={false} icon="gamepad" mode="contained" onPress={() => navigation.replace('Game')}>
          Play Again
        </WhiteButton>
      </MainView>
    ) ;
}

export default WinScreen ;