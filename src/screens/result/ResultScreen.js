import { useContext, useEffect, useState, useCallback } from 'react' ;
import { useFocusEffect } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { Avatar, DataTable } from 'react-native-paper';
import { BackHandler } from 'react-native' ;
import { CountUp } from 'use-count-up' ;

import BoxNumber from '../../comps/boxnumber/BoxNumber.js' ;
import Img from '../../comps/img/Img.js' ;
import { CapitalKufam, ButtonRow, ScoreTable } from './cssResultScreen.js' ;
import { WhiteButton, KufamText, MainScrollView, Row, GreenView } from '../../../cssApp.js' ;
import { TimerText } from '../game/cssGameScreen.js' ;
import { Gem } from '../../comps/icons.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { theme } from '../../theme.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;

const ResultScreen = ({navigation, route}) => {
    const [scores, setScores] = useState([]) ;
    const [final, setFinal] = useState(false) ;
    const {rounds, wins, hints, wrongs, topic, mode} = route.params ;
    const {user, userToken, gems, addGems, fetchUrl} = useContext(UserContext) ;

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
            
            fetch(`${fetchUrl}game` ,{
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

    const returnGemText = () => {
        if(mode !== 'practice' && user.name)
            if(final)
                return <AnimateView delay={300}><KufamText> <Gem /> {gems} ( + {Math.ceil(wins/10)} ) </KufamText></AnimateView> ;
            else
                return <KufamText> <Gem /> <CountUp isCounting end={gems} duration={2} onComplete={() => {addGems(Math.ceil(wins/20)); setFinal(true)}}/> + <CountUp isCounting end={Math.ceil(wins/10)} duration={2} /> </KufamText> ;
        else
            return <KufamText size={18} > Play Challenge Mode to earn <Gem size={14}/> </KufamText> ;
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
        const avatarProps = {
            style : { backgroundColor: theme.colors.white},
            size : 100,
            source : user.name?{uri: user.image}:require('../../../assets/user.png'),
        }

        if(user.name)
            return (
                <>
                    <Avatar.Image {...avatarProps}/>
                    <CapitalKufam size={20}>Your High Scores</CapitalKufam>
                    <ScoreTable>{ returnRows() }</ScoreTable>
                    <ButtonRow>
                        <WhiteButton dark={false} icon="podium" mode="contained" onPress={() => navigation.navigate('HighScore', {topic, mode, filter: 'me'})}>See More</WhiteButton>
                    </ButtonRow>
                </>
        ) ;
        else
            return (
                <>
                    <Img src={require('../../../assets/sign-up.png')} />
                    <WhiteButton dark={false} mode="contained" onPress={() => navigation.replace('Profile')}>Sign Up</WhiteButton>
                </>
            ) ;
    }

    return (
        <MainScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <KufamText style={{textTransform: 'capitalize'}}>{topic} {mode} Summary</KufamText>
            <CountdownCircleTimer duration={countDown.rounds} initialRemainingTime={countDown.wins} colors="#f55442" trailColor="#ffffff" trailStrokeWidth={24}>
              {({ remainingTime }) => <TimerText><CountUp isCounting end={remainingTime} duration={2} /></TimerText>}
            </CountdownCircleTimer>
            <Row>
                <BoxNumber text="Your Score" num={wins} color={theme.colors.green}/>
                <BoxNumber text="Hints Used" num={hints} color={theme.colors.mainLight}/>
            </Row>
            <GreenView>{ returnGemText() }</GreenView>
            { returnSignIn() }
            <ButtonRow>
                <WhiteButton dark={false} icon="reload" mode="contained" onPress={() => navigation.replace('Game', {mode, topic})}>Play Again</WhiteButton>
                <WhiteButton dark={false} icon="home" mode="contained" onPress={() => navigation.replace('Home')}>Go Home</WhiteButton>
            </ButtonRow>
        </MainScrollView>
    ) ;
}

export default ResultScreen ;