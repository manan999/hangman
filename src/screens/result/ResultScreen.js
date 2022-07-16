import { useContext, useEffect, useState, useCallback } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { Avatar, DataTable } from 'react-native-paper';
import { BackHandler } from 'react-native' ;

import BoxNumber from '../../comps/boxnumber/BoxNumber.js' ;
import { MainView, CapitalKufam, ButtonRow, ScoreTable } from './cssResultScreen.js' ;
import { WhiteButton, KufamText, MainScrollView, Row } from '../../../cssApp.js' ;
import { TimerText } from '../game/cssGameScreen.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { theme } from '../../theme.js' ;

const ResultScreen = ({navigation, route}) => {
    const [scores, setScores] = useState([]) ;
    const {rounds, wins, hints, wrongs, topic, mode} = route.params ;
    const {user, userToken} = useContext(UserContext) ;

    const countDown = mode==='practice'?{rounds, wins}:{rounds: rounds*20, wins} ;

    const formatDate = (dt) => {
        const date = new Date(dt).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}) ;
        const [ day, m, d, t, y ] = date.split(' ').filter(o=>o.length>0) ;
        return `${t.slice(0,5)}, ${d} ${m} ${y}`;
    }

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.replace('Home') ;
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
     );
    
    useEffect( () => {
        if(user.name) {
            // console.log(JSON.stringify({topic, mode, score: wins, wrongs, hints, misc: {}}))
            
            // fetch('https://web.myarthhardware.com/game' ,{
            fetch('http://192.168.1.14:8000/game' ,{
                method : 'post',
                headers : { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${userToken}`},
                body : JSON.stringify({topic, mode, score: wins, wrongs, hints, misc: {}}),
            })
            .then(res =>  res.json())
            .then(resp => {
                // console.log(resp) ;
                setScores(resp) ;
            })
            .catch( err  => console.log(err) ) ;
        }
    }, [])

    const avatarProps = {
        style : { backgroundColor: theme.colors.white},
        size : 100,
        source : user.name?{uri: user.image}:require('../../../assets/user.png'),
    }

    const returnRows = () => {
        let arr = scores.map((score, i) => {
            return (
                <DataTable.Row key={i}>
                    <DataTable.Cell style={{flex:2}}><KufamText size={13}>{i+1}</KufamText></DataTable.Cell>
                    <DataTable.Cell style={{flex:2}}><KufamText size={18}>{score.score}</KufamText></DataTable.Cell>
                    <DataTable.Cell style={{flex:3}}><KufamText size={14}>{formatDate(score.createdAt)}</KufamText></DataTable.Cell>
                </DataTable.Row>
            ) ;
        })
        return arr ;
    }

    const returnSignIn = () => {
        if(user.name)
            return (
                <>
                    <CapitalKufam size={20}>Your High Scores</CapitalKufam>
                    <ScoreTable>{ returnRows() }</ScoreTable>
                    <ButtonRow>
                        <WhiteButton dark={false} icon="podium" mode="contained" onPress={() => navigation.navigate('HighScore')}>See More</WhiteButton>
                    </ButtonRow>
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
            <CountdownCircleTimer duration={countDown.rounds} initialRemainingTime={countDown.wins} colors="#f55442" trailColor="#ffffff" trailStrokeWidth={24}>
              {({ remainingTime }) => <TimerText>{remainingTime}</TimerText>}
            </CountdownCircleTimer>
            <Row>
                <BoxNumber text="Your Score" num={wins} color={theme.colors.green}/>
                <BoxNumber text="Hearts Lost" num={wrongs} color={theme.colors.red}/>
                <BoxNumber text="Hints Used" num={hints} color={theme.colors.mainLight}/>
            </Row>
            <ButtonRow>
                <WhiteButton dark={false} icon="reload" mode="contained" onPress={() => navigation.replace('Game', {mode})}>Play Again</WhiteButton>
                <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>Go Home</WhiteButton>
            </ButtonRow>
            <Avatar.Image {...avatarProps}/>
            { returnSignIn() }
        </MainScrollView>
    ) ;
}

export default ResultScreen ;