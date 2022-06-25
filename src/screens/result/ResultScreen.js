import { useContext, useEffect, useState } from 'react' ;
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { Avatar, DataTable } from 'react-native-paper';

import BoxNumber from '../../comps/boxnumber/BoxNumber.js' ;
import { Row } from '../../../cssApp.js' ;
import { MainView, CapitalKufam, ButtonRow, ScoreTable } from './cssResultScreen.js' ;
import { WhiteButton, KufamText, MainScrollView } from '../../../cssApp.js' ;
import { TimerText } from '../game/cssGameScreen.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { theme } from '../../theme.js' ;

const ResultScreen = ({navigation, route}) => {
    const [scores, setScores] = useState(null) ;
    const {rounds, wins, hints, wrongs, topic, mode} = route.params ;
    const {user, userToken} = useContext(UserContext) ;

    useEffect( () => {
        if(user.name) {
            fetch('https://web.myarthhardware.com/game' ,{
            // fetch('http://192.168.1.8:8000/game' ,{
                method : 'post',
                headers : { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${userToken}`},
                body : JSON.stringify({topic, mode, score: wins, wrongs, hints, misc: {}}),
            })
            .then(res =>  res.json())
            .then(resp => {console.log(resp);setScores(resp);} )
            .catch( err  => console.log(err) ) ;
        }
    }, [])

    const avatarProps = {
        style : { backgroundColor: theme.colors.white},
        size : 100,
        source : user.name?{uri: user.image}:require('../../../assets/user.png'),
    }

    const returnSignIn = () => {
        if(user.name)
            return (
                <>
                    <CapitalKufam size={20}>Your High Scores</CapitalKufam>
                    <ScoreTable>
                        <DataTable.Header>
                            <DataTable.Title>Dessert</DataTable.Title>
                            <DataTable.Title numeric>Calories</DataTable.Title>
                            <DataTable.Title numeric>Fat</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                            <DataTable.Cell numeric>159</DataTable.Cell>
                            <DataTable.Cell numeric>6.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                            <DataTable.Cell numeric>237</DataTable.Cell>
                            <DataTable.Cell numeric>8.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                            <DataTable.Cell numeric>237</DataTable.Cell>
                            <DataTable.Cell numeric>8.0</DataTable.Cell>
                        </DataTable.Row>

                    </ScoreTable>
                    <WhiteButton dark={false} icon="podium" mode="contained" onPress={() => navigation.replace('HighScore')}>See More</WhiteButton>
                </>
        ) ;
        else
            return (
                <Row>
                    <WhiteButton dark={false} mode="contained" onPress={() => navigation.replace('Profile')}>Sign In</WhiteButton>
                    <KufamText size={20}>to save your scores</KufamText>
                </Row>
            ) ;
    }

    return (
        <MainScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <KufamText>{topic} {mode} Summary</KufamText>
            <CountdownCircleTimer duration={rounds} initialRemainingTime={wins} colors="#f55442" trailColor="#ffffff" trailStrokeWidth={24}>
              {({ remainingTime }) => <TimerText>{remainingTime}</TimerText>}
            </CountdownCircleTimer>
            <Row>
                <BoxNumber text="Your Score" num={wins} color={theme.colors.green}/>
                <BoxNumber text="Lives Lost" num={wrongs} color={theme.colors.red}/>
                <BoxNumber text="Hints Used" num={hints} color={theme.colors.mainLight}/>
            </Row>
            <Avatar.Image {...avatarProps}/>
            { returnSignIn() }
            <ButtonRow>
                <WhiteButton dark={false} icon="reload" mode="contained" onPress={() => navigation.replace('Game', {mode: 'practice'})}>Play Again</WhiteButton>
                <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>Go Home</WhiteButton>
            </ButtonRow>
        </MainScrollView>
    ) ;
}

export default ResultScreen ;