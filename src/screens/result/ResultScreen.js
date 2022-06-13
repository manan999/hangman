import LottieView from 'lottie-react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;

import {MainView, LaughView} from './cssResultScreen.js' ;
import {WhiteButton, KufamText} from '../../../cssApp.js' ;
import {TimerText} from '../game/cssGameScreen.js' ;

import Laugh from '../../../assets/laugh.json' ;
import Wow from '../../../assets/wow.json' ;

const ResultScreen = ({navigation, route}) => {
    const {rounds, winCount} = route.params ;
    const obj = (winCount <= rounds/2)?{color: "#f55442", link: Laugh }:{color: "#05f545", link: Wow} ;

    return (
      <MainView>
        <KufamText>Your Score is </KufamText>
        <CountdownCircleTimer duration={rounds} initialRemainingTime={winCount} colors={obj.color} trailColor="#ffffff" trailStrokeWidth={24}>
          {({ remainingTime }) => <TimerText>{remainingTime}</TimerText>}
        </CountdownCircleTimer>
        <LaughView>
          <LottieView source={obj.link} autoPlay loop />
        </LaughView>
        <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>
          Go Back
        </WhiteButton>
      </MainView>
    ) ;
}

export default ResultScreen ;