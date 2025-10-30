import { useContext, useEffect, useState, useCallback } from 'react' ;
import { InterstitialAd, /*TestIds,*/ AdEventType } from 'react-native-google-mobile-ads';
import { useFocusEffect } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { Avatar, DataTable } from 'react-native-paper';
import { BackHandler, ToastAndroid } from 'react-native' ;
import { CountUp } from 'use-count-up' ;
import styled from 'styled-components/native' ;
// import crashlytics from '@react-native-firebase/crashlytics';

import { TimerText } from '../game/cssGameScreen.js' ;
import { Gem } from '../../comps/icons.js' ;
import { UserContext } from '@uc' ;
import { theme } from '@theme' ;
import { P, MainScrollView, Row, GreenView, Button, BoxNumber, Img, AnimateView } from '@comps' ;

const adUnitId = 'ca-app-pub-7668722490423187/3467857782' ;
// const adUnitId = TestIds.INTERSTITIAL ;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const ResultScreen = ({navigation, route}) => {
    const [loaded, setLoaded] = useState(false);
    const [scores, setScores] = useState([]) ;
    const [final, setFinal] = useState(false) ;
    const {rounds, wins, topic, mode} = route.params ;
    const {user, userToken, gems, addGems, fetchUrl} = useContext(UserContext) ;

    const countDown = mode==='practice'?{rounds, wins}:{rounds: rounds*20, wins} ;

    const btnProps = {
        buttonColor : "white", color : "main", mw : 100, mode : "contained",
    } ;

    const formatDate = (dt) => {
        const date = new Date(dt) ;
        const formattedDate = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) +
        ', ' + date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
        return formattedDate ;
    }

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                ToastAndroid.show("On this screen, Back Button is disabled", ToastAndroid.SHORT) ;
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
     );
    
    useEffect( () => {
        if(user.name) {
            // console.log(JSON.stringify({topic, mode, score: wins }))
            
            fetch(`${fetchUrl}game` ,{
                method : 'post',
                headers : { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${userToken}`},
                body : JSON.stringify({topic, mode, score: wins }),
            })
            .then(res =>  res.json())
            .then(resp => {
                // console.log(resp) ;
                setScores(resp) ;
            })
            .catch( err  => console.log(err) ) ;
        }

        console.log('trying to load ad') ;

        const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, error => {
            console.log('ad error ', error) ;
            // crashlytics().log('ad error ', error) ;
        });

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
            console.log('ad loaded ', adUnitId) ;
            // crashlytics().log('ad loaded ', adUnitId) ;
        });

        const unsubscribeClose = interstitial.addAdEventListener(AdEventType.CLOSED, error => {
            console.log('ad closed', error) ;
            // crashlytics().log('ad closed') ;
            setLoaded(false);
       
            //reload ad 
            interstitial.load();
        });

        interstitial.load();

        if(interstitial._loaded) 
            setLoaded(true) ;

        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded() ;
          unsubscribeClose() ;
          unsubscribeError() ;
        };
    }, [])

    const showAd = fn => {
        if(!loaded) 
            ToastAndroid.show("Please Wait, Ad is loading...", ToastAndroid.SHORT)
        else {
            interstitial.show() ;
            fn() ;
        }
    }

    const returnGemText = () => {
        if(mode !== 'practice' && user.name)
            if(final)
                return <AnimateView delay={300}><P color="white"> <Gem /> {gems} ( + {Math.ceil(wins/20)} ) </P></AnimateView> ;
            else
                return <P color="white"> <Gem /> <CountUp isCounting end={gems} duration={2} onComplete={() => {addGems(Math.ceil(wins/20)); setFinal(true)}}/> + <CountUp isCounting end={Math.ceil(wins/20)} duration={2} /> </P> ;
        else
            return <P color="white" size={18} > Play Challenge Mode to earn <Gem size={14}/> </P> ;
    }


    const returnRows = () => {
        const arr = scores.map((score, i) => {
            return (
                <DataTable.Row key={i} style={{borderBottomWidth: 0 }}>
                    <DataTable.Cell style={{flex:2}}><P color="white" size={13}>{i+1}</P></DataTable.Cell>
                    <DataTable.Cell style={{flex:2}}><P color="white" size={18}>{score.score}</P></DataTable.Cell>
                    <DataTable.Cell style={{flex:3}}><P color="white" size={14}>{formatDate(score.createdAt)}</P></DataTable.Cell>
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
                    <P color="white" cap size={20}>Your High Scores</P>
                    <ScoreTable>{ returnRows() }</ScoreTable>
                    <ButtonRow>
                        <Button {...btnProps} icon="podium" onPress={() => showAd(() => navigation.navigate('HighScore', {topic, mode, filter: 'me'}))}>See More</Button>
                    </ButtonRow>
                </>
        ) ;
        else
            return (
                <>
                    <Img src={require('../../../assets/sign-up.png')} />
                    <Button {...btnProps} onPress={() => showAd(() => navigation.replace('Profile'))}>Sign Up</Button>
                </>
            ) ;
    }

    return (
        <MainScrollView contentContainerStyle={{ alignItems: 'center', rowGap: 16 }}>
            <TitleCon>
                <P color="white" cap>{topic} {mode} Summary</P>
            </TitleCon>
            <CountdownCircleTimer duration={countDown.rounds} initialRemainingTime={countDown.wins} colors="#f55442" trailColor="#ffffff" trailStrokeWidth={24}>
              {({ remainingTime }) => <TimerText><CountUp isCounting end={remainingTime} duration={2} /></TimerText>}
            </CountdownCircleTimer>
            <Row>
                <BoxNumber text="Your Score" num={wins} color={theme.colors.green}/>
            </Row>
            <GreenView>{ returnGemText() }</GreenView>
            { returnSignIn() }
            <ButtonRow>
                <Button {...btnProps} icon="reload" onPress={()=>showAd(()=>navigation.replace('Game', {mode, topic}))}>Play Again</Button>
                <Button {...btnProps} icon="home" onPress={()=>showAd(()=>navigation.replace('Home', {popOpen: true}))}>Go Home</Button>
            </ButtonRow>
        </MainScrollView>
    ) ;
}

export default ResultScreen ;

const TitleCon = styled.View`
    padding: 16px 0 ;
` ;

const ButtonRow = styled(Row)`
    margin-bottom: 0 ;
` ; 

const ScoreTable = styled(DataTable)` 
    color: ${ ({theme}) => theme.colors.white } ;
    font-family: ${ ({theme}) => theme.fonts.main } ;
` ;