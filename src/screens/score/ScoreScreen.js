import LottieView from 'lottie-react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;

import {MainView, LaughView} from './cssScoreScreen.js' ;
import {WhiteButton, KufamText} from '../../../cssApp.js' ;
import {TimerText} from '../game/cssGameScreen.js' ;

import Laugh from '../../../assets/laugh.json' ;
import Wow from '../../../assets/wow.json' ;

const ScoreScreen = ({navigation, route}) => {
    const {rounds, score} = route.params ;

    return (
      <MainView>
        <KufamText>Your Score is </KufamText>
        <CountdownCircleTimer duration={rounds*20} initialRemainingTime={score} colors="#05f545" trailColor="#ffffff" trailStrokeWidth={24}>
          {({ remainingTime }) => <TimerText>{remainingTime}</TimerText>}
        </CountdownCircleTimer>
        <LaughView>
          <LottieView source={(score <= rounds*8)?Laugh:Wow} autoPlay loop />
        </LaughView>
        <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>
          Go Back
        </WhiteButton>
      </MainView>
    ) ;
}

export default ScoreScreen ;