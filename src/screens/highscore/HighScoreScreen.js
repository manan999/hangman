import { useState, useEffect, useContext } from 'react' ;
import { Avatar, DataTable, ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native' ;

import { UserContext } from '@uc' ;
import { P, MainView, MainScrollView, Row } from '@comps' ;
import { theme } from '@theme' ;

const HighScoreScreen = ({route}) => {
    const {userToken, topics, fetchUrl} = useContext(UserContext) ;
    const [topic, setTopic] = useState(route.params.topic?route.params.topic:'Movies') ;
    const [gameMode, setGameMode] = useState(route.params.mode?route.params.mode:'challenge') ;
    const [data, setData] = useState([]) ;
    
    const topicItems = [ ...Object.keys(topics).map(one=>({ value: one, label: one })) ] ;
    const modeItems = [ 
        { label: 'Practice', value: 'practice'}, 
        { label: 'Challenge', value: 'challenge'} 
    ] ;

    useEffect( () => {
        setData([]) ;
        fetch(`${fetchUrl}scores`, {
            method : 'post',
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${userToken}`},
            body : JSON.stringify({filter: 'all', topic, mode: gameMode}),
        })
        .then(res => {
            if(res.ok)
                return res.json() ;
            throw Error(res.statusText) ;
        })
        .then( data => setData(data.filter(one => one)) ) 
        .catch( err  => console.log(err) ) ;
    }, [topic, gameMode])

    const returnRows = () => {
        if(data.length > 0) {
            const arr = data.map((score, i) => {
                const avatarProps = {
                    style : { backgroundColor: theme.colors.white},
                    size : 40,
                    source : {uri: score.image},
                }

                return (
                    <DataTable.Row key={i} style={{borderBottomWidth: 0 }}>
                        <DataTable.Cell style={{flex:1}}><P color="white" size={13}>{i+1}</P></DataTable.Cell>
                        <DataTable.Cell style={{flex:1.5}}><Avatar.Image {...avatarProps} /></DataTable.Cell>
                        <DataTable.Cell style={{flex:3}}><P color="white" size={14}>{score.playerName}</P></DataTable.Cell>
                        <DataTable.Cell style={{flex:1}}><P color="white" size={16}>{score.score}</P></DataTable.Cell>
                    </DataTable.Row>
                ) ;
            })
            return arr ;
        }
        else
            return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView>
    }   

    return (
        <MainView rowGap={16}>
            <TitleCon>
                <P color="white">High Scores</P>
            </TitleCon>
            <Row>
                <PickerCon>
                    <P align="left" color="white" size={16}> Game Mode </P>
                    <PickerView>
                        <Picker style={{ backgroundColor: '#fff' }} selectedValue={gameMode} onValueChange={setGameMode}>
                            <Picker.Item label="Select Game Mode" value="" />
                            {
                                modeItems?.map(({label,value})=><Picker.Item key={value} label={label} value={value} />)
                            }
                        </Picker>
                    </PickerView>
                </PickerCon>
                <PickerCon>
                    <P align="left" color="white" size={16}> Topic </P>
                    <PickerView>
                        <Picker style={{ backgroundColor: '#fff' }} selectedValue={topic} onValueChange={setTopic}>
                            <Picker.Item label="Select Topic" value="" />
                            {
                                topicItems?.map(({label,value})=><Picker.Item key={value} label={label} value={value} />)
                            }
                        </Picker>
                    </PickerView>
                </PickerCon>
            </Row>
            <MainScrollView><ScoreTable>{ returnRows() }</ScoreTable></MainScrollView>
        </MainView>
    ) ;
}

export default HighScoreScreen ;

const TitleCon = styled.View`
    padding-top: 16px ;
` ;

const ScoreTable = styled(DataTable)` 
    color: ${ ({theme}) => theme.colors.white } ;
    font-family: ${ ({theme}) => theme.fonts.main } ;
` ;

const PickerCon = styled.View`
    flex: 0.45 ;
    gap: 12px ;
` ;

const PickerView = styled.View`
    border-radius: 6px ;
    overflow: hidden ;
` ;