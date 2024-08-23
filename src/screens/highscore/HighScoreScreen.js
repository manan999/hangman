import { useState, useEffect, useContext } from 'react' ;
import { Avatar, DataTable, ActivityIndicator } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker' ;

import { UserContext } from '../../context/UserContext.js' ;
import { DDView, ScoreTable } from './cssHighScore.js' ;
import { P, MainView, MainScrollView } from '@comps' ;
import { theme } from '../../theme.js' ;

const HighScoreScreen = ({navigation, route}) => {
    const {userToken, topics, fetchUrl} = useContext(UserContext) ;
    
    const [topic, setTopic] = useState(route.params.topic?route.params.topic:'Movies') ;
    const [topicOpen, setTopicOpen] = useState(false) ;
    const [topicItems, setTopicItems] = useState([...Object.keys(topics).map(one => {
        return {value: one, label: topics[one].label}
    })]) ;

    const [gameMode, setGameMode] = useState(route.params.mode?route.params.mode:'challenge') ;
    const [modeOpen, setModeOpen] = useState(false) ;
    const [modeItems, setModeItems] = useState([{label: 'Mode : Practice', value: 'practice'}, {label: 'Mode : Challenge', value: 'challenge'} ]) ;
    
    const [data, setData] = useState([]) ;

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


    // const formatDate = (dt) => {
    //     const date = new Date(dt) ;
    //     const formattedDate = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) +
    //     ', ' + date.toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' });
    //     return formattedDate ;
    // }

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
                        {/*<DataTable.Cell style={{flex:3, width: '100%'}}><P color="white" size={14}>{formatDate(score.createdAt)}</P></DataTable.Cell>*/}
                    </DataTable.Row>
                ) ;
            })
            return arr ;
        }
        else
            return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView>
    }   

    return (
        <MainView>
            <P color="white">High Scores</P>
            <DDView>
                <DropDownPicker style={{ marginTop: 5, marginBottom: 5}} open={modeOpen} value={gameMode} items={modeItems} setOpen={setModeOpen} setValue={setGameMode} setItems={setModeItems} zIndex={2000} zIndexReverse={2000}/>
                <DropDownPicker style={{ marginTop: 5, marginBottom: 5}} open={topicOpen} value={topic} items={topicItems} setOpen={setTopicOpen} setValue={setTopic} setItems={setTopicItems} zIndex={1000} zIndexReverse={3000}/>
            </DDView>
            <MainScrollView><ScoreTable>{ returnRows() }</ScoreTable></MainScrollView>
        </MainView>
    ) ;
}

export default HighScoreScreen ;