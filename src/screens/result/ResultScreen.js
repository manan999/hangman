import { useContext } from 'react' ;
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { Avatar } from 'react-native-paper';

import BoxNumber from '../../comps/boxnumber/BoxNumber.js' ;
import { Row } from '../../../cssApp.js' ;
import { MainView, LaughView } from './cssResultScreen.js' ;
import { WhiteButton, KufamText } from '../../../cssApp.js' ;
import { TimerText } from '../game/cssGameScreen.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { theme } from '../../theme.js' ;

const ResultScreen = ({navigation, route}) => {
    const {rounds, wins, hints, wrongs, topic, mode} = route.params ;
    const {user} = useContext(UserContext) ;

    const avatarProps = {
      style : { backgroundColor: theme.colors.white},
      size : 100,
      source : user.name?{uri: user.image}:require('../../../assets/user.png'),
    }

    const returnSignIn = () => {
      if(user.name)
        return (
          <Row>
            <KufamText size={20}>{user.name}'s High Scores</KufamText>
          </Row>
        ) ;
      else
        return (
          <Row>
            <WhiteButton dark={false} mode="contained" onPress={() => navigation.replace('Home')}>Sign In</WhiteButton>
            <KufamText size={20}>to save your scores</KufamText>
          </Row>
        ) ;
    }

    return (
      <MainView>
        <Avatar.Image {...avatarProps}/>
        <KufamText>{topic} {mode} Summary</KufamText>
        <CountdownCircleTimer duration={rounds} initialRemainingTime={wins} colors="#f55442" trailColor="#ffffff" trailStrokeWidth={24}>
          {({ remainingTime }) => <TimerText>{remainingTime}</TimerText>}
        </CountdownCircleTimer>
        <Row>
          <BoxNumber text="Your Score" num={wins} color={theme.colors.green}/>
          <BoxNumber text="Lives Lost" num={wrongs} color={theme.colors.red}/>
          <BoxNumber text="Hints Used" num={hints} color={theme.colors.mainLight}/>
        </Row>
        { returnSignIn() }
        <Row>
          <WhiteButton dark={false} icon="reload" mode="contained" onPress={() => navigation.replace('Game', {mode: 'practice'})}>Play Again</WhiteButton>
          <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>Go Home</WhiteButton>
        </Row>
      </MainView>
    ) ;
}

export default ResultScreen ;