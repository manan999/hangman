import { useState, useEffect } from 'react' ;
import { Text, View, Pressable, Vibration } from 'react-native';
import { ActivityIndicator } from 'react-native-paper' ;
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer' ;
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import Cross from '../../comps/icons/Cross.js' ;
import AnimateView from '../../comps/animateview/AnimateView.js' ;
import {MainView, AlphaRow, WordView, CrossView, CrossCon, GameText, GuesserView, 
    TimerText, HintHead, HintText, HintView, GameHeader, ScoreHead, ScoreText, ScoreView} from '../game/cssGameScreen.js' ;
import {Alpha, Letter} from '../game/AlphaLetter.js' ;

const alphas = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'] ;

const movs = [{
        "name": "3 Idiots",
        "hints": ["Aamir Khan", "2009", "Comedy"],
    },{
        "name": "Andaz Apna Apna",
        "hints": ["Salman Khan", "1994", "Romance"],
    },{
        "name": "Baghban",
        "hints": ["Amitabh Bachchan", "2003", "Drama" ],
    },{
        "name": "Bhaag Milkha Bhaag",
        "hints": ["Farhan Akhtar", "2013", "Biography" ],
    },{
        "name": "Bhool Bhulaiyaa",
        "hints": ["Akshay Kumar", "2007", "Mystery" ],
    },
] ; 

const Game = ({movie, round, next, hint, config, waiting=true}) => {
  const [guessed, setGuessed] = useState(config.initGuess) ;
  const [details, setDetails] = useState({}) ;
  const [wrong, setWrong] = useState(0) ;
  const [hintCount, setHintCount] = useState(1) ;
  const [correct, setCorrect] = useState(0) ;
  const [time, setTime] = useState(config.startTime) ;
  const [wait, setWait] = useState(waiting) ;

  useEffect(() => {
    const timer = setTimeout(() => setWait(false), 2000);
    return () => clearTimeout(timer);
  }, [wait]);

  useEffect( () => {
    let obj = {} ;
    movie.toLowerCase().split('').forEach(l => {
      if(obj[l])
        obj[l] += 1 ; 
      else
        obj[l] = 1 ;
    })
    setDetails(obj) ;
    setTime(config.startTime) ;
    setWrong(0) ;
    setCorrect(0) ;
    setWait(true) ;
    setHintCount(1) ;
    setGuessed(config.initGuess) ;
  }, [movie])

  useEffect( () => {
    if(movie.length>0 && movie.toLowerCase().split('').filter(c=>(c.toLowerCase()>='a'&&c.toLowerCase()<='z')).every(v => guessed.includes(v))) {
      next('Win', wrong, hintCount) ;
    }
  }, [correct])

  useEffect( () => {
    if(guessed !== config.initGuess) {
      let l = guessed.slice(-1)[0] ;
      if(l) {
        if(details[l]) 
          setCorrect(correct+details[l]) ;
        else
          if(wrong < 5)
            setWrong(wrong+1) ;
          else {
            Vibration.vibrate(200) ;
            next('Loss') ;
          }
      }
    }
  }, [guessed])

  const returnLetter = (str) => {
    if(str.toLowerCase() >= 'a' && str.toLowerCase() <= 'z')
      return (guessed.includes(str))?str:'_' ;
    else
      return str ;
  }

  const returnGuesser = () => {
    return movie.toLowerCase().split(' ').map( (one, i) => {
      return (
        <WordView key={i}>
          { one.split('').map((two,i) => {
              return <Letter key={i} text={returnLetter(two)} /> ;
            }) 
          }
        </WordView>
      ) ;
    }) ;
  }

  const returnHintButton = () => {
    if(hintCount && hintCount < 3)
      return <Pressable onPress={() => setHintCount(hintCount+1)}><MaterialIcons name="lightbulb" size={36} color="yellow" /></Pressable> ;
    else
      return <MaterialIcons name="lightbulb" size={36} color="grey" /> ;
  }

  return (
    <MainView>
        <GameHeader>
            <ScoreView><ScoreHead>Score :</ScoreHead><ScoreText>{config.score}</ScoreText></ScoreView>
            <AnimateView>
              {returnHintButton()}
            </AnimateView>
        </GameHeader>
        <CrossView>
            {Array.from(new Array(wrong)).map((one, i)=><CrossCon key={i}><Cross/></CrossCon>)}
        </CrossView>
        <AnimateView>
            <CountdownCircleTimer isPlaying={!wait} duration={time} colors={['#FFFFFF', '#f55442']} colorsTime={[30, 0]} trailColor="#1d2951" onComplete={()=>next('Loss')} size={90} strokeWidth={8}>
            {({ remainingTime }) => <Animatable.View animation="rubberBand" iterationCount="infinite" ><TimerText>{remainingTime}</TimerText></Animatable.View>}
            </CountdownCircleTimer>
        </AnimateView>
        <Animatable.View key={round+1} iterationCount={3} animation="bounce">
            <GameText> Movies : Round {round+1} </GameText>
        </Animatable.View>
        <GuesserView>
            <AnimateView> 
                <AlphaRow>{returnGuesser()}</AlphaRow>
            </AnimateView>
            <AnimateView> 
                <HintView>
                    <HintHead> Hints : </HintHead>
                    <HintText>{hint.slice(0, hintCount).join(', ')}</HintText>
                </HintView>
            </AnimateView>
        </GuesserView>
        <AnimateView> 
            { alphas.map( (one,i) => <AlphaRow key={i}>
                {one.split('').map(two=><Alpha key={two} text={two} guess={(str) => {
                  if(!wait) setGuessed([...guessed, str]) ;
                }} guessed={guessed.includes(two)}/>)}
              </AlphaRow>)
            } 
        </AnimateView>
    </MainView>
  ) ;
}

const TutorialScreen = ({navigation}) => {
  const [currentRound, setCurrentRound] = useState(0) ;
  const [movies, setMovies] = useState([]) ;
  const [movie, setMovie] = useState('') ;
  const [winCount, setWinCount] = useState(0) ;

  useEffect( ()=> setMovies(movs) , [currentRound])

  useEffect( () => {
    if(movies.length > 0 && currentRound < 5) {
      setMovie(movies[currentRound].name) ;
    }
  }, [currentRound, movies])

  const next = (str, num = 0, hintCount) => {
    if(str === 'Win' && currentRound+1 !== 5) {
        hintCount -= 1 ;
        setWinCount(winCount+(20-(2*num)-(3*hintCount))) ;  
        setCurrentRound(currentRound+1) ;
    }       
    else
        navigation.replace('Score', {rounds: currentRound+1, score: winCount })
  }

    if(movies.length > 0) {
        const gameProps = {
            movie, next,
            hint: movies[currentRound].hints,
            config: {
                score: winCount,
                startTime : 60, 
                initGuess : ['a','e','i','o','u']
            }
        }
        return <Game key={currentRound} round={currentRound} {...gameProps}/> ;
    }
    else
        return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView> ;
}

export default TutorialScreen ;