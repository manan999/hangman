import styled from 'styled-components/native' ;

const MainView = styled.View`
  flex: 1 ;
  justify-content: center ;
  align-items: center ;
  background-color: ${ ({theme}) => theme.colors.main } ;
  position: relative ;
  padding-bottom: 25px ;
` ;

const AlphaRow = styled.View` 
  flex-direction: row ;
  justify-content: center ;
  flex-wrap: wrap ;
` ;

const GuesserView = styled.View`
  flex: 1 ;
  justify-content: center;
  align-self: stretch ;
` ;

const WordView = styled.View` 
  flex-direction: row ;
  margin: 0 10px ;
  flex-wrap: ${ ({wrap}) => wrap?wrap:'wrap' } ;
` ;
  // flex-wrap: wrap ;

const CrossCon = styled.View` 
  margin: 12px 5px ;  
` ;

const GameText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 22px ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
  text-align: center ;
` ;

const TimerText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 26px ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

const HintHead = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 18px ;
  text-transform: capitalize ;
  text-align: center;
  font-family: ${ ({theme}) => theme.fonts.mainBold } ;
  margin: 25px 0 10px ;
` ;

const GameHeader = styled.View`
  flex-direction: row ;  
  justify-content: space-between ;
  align-items: center ;
  align-self: stretch ;
  padding: 20px 15px;
` ;

const HeaderChild = styled.View`
  align-items: center ;
` ;

const ScoreHead = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 16px ;
  font-family: ${ ({theme}) => theme.fonts.main } ;
  margin-bottom: 5px ;
` ;

const ScoreText = styled.Text`
  color: ${ ({theme}) => theme.colors.white } ;
  font-size: 24px ;
  font-family: ${ ({theme}) => theme.fonts.mainBold } ;
  margin: 0 5px ;
` ;

export {MainView, AlphaRow, WordView, CrossCon, GameText, GuesserView, TimerText, 
        HintHead, GameHeader, ScoreHead, ScoreText, HeaderChild} ;