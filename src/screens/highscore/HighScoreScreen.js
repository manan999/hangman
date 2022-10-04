import { useState, useEffect, useContext } from 'react' ;
import { View, Text } from 'react-native' ;
import { Avatar, DataTable, ActivityIndicator } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker' ;

import { UserContext } from '../../context/UserContext.js' ;
import { DDView, ScoreTable } from './cssHighScore.js' ;
import { MainView, KufamText, MainScrollView } from '../../../cssApp.js' ;
import { theme } from '../../theme.js' ;

const HighScoreScreen = ({navigation, route}) => {
    const {user, userToken, topics, fetchUrl} = useContext(UserContext) ;
    
    const [filterBy, setFilterBy] = useState(route.params.filter?route.params.filter:'all') ;
    const [filterOpen, setFilterOpen] = useState(false) ;
    const [filterItems, setFilterItems] = useState([{label: 'Show For : All', value: 'all'}, {label: 'Show For : Only Me', value: 'me'} ]) ;

    const [topic, setTopic] = useState(route.params.topic?route.params.topic:'Movies') ;
    const [topicOpen, setTopicOpen] = useState(false) ;
    const [topicItems, setTopicItems] = useState([...Object.keys(topics).map(one => {
        return {value: one, label: topics[one].label}
    })]) ;

    const [gameMode, setGameMode] = useState(route.params.mode?route.params.mode:'practice') ;
    const [modeOpen, setModeOpen] = useState(false) ;
    const [modeItems, setModeItems] = useState([{label: 'Mode : Practice', value: 'practice'}, {label: 'Mode : Challenge', value: 'challenge'} ]) ;
    
    const [data, setData] = useState([]) ;

    useEffect( () => {
        setData([]) ;
        fetch(`${fetchUrl}scores`, {
            method : 'post',
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${userToken}`},
            body : JSON.stringify({filter: filterBy, topic, mode: gameMode}),
        })
        .then(res => {
            if(res.ok)
                return res.json() ;
            throw Error(res.statusText) ;
        })
        .then( data => setData(data.filter(one => one)) ) 
        .catch( err  => console.log(err) ) ;
    }, [filterBy, topic, gameMode])


    const formatDate = (dt) => {
        const month = {
            'Jan' : '01',   'Feb' : '02',   'Mar' : '03',   'Apr' : '04',   'May' : '05',   'Jun' : '06',
            'Jul' : '07',   'Aug' : '08',   'Sep' : '09',   'Oct' : '10',   'Nov' : '11',   'Dec' : '12'
        }

        const date = new Date(dt).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}) ;
        const [ day, m, d, t, y ] = date.split(' ').filter(o=>o.length>0) ;
        return `${d>9?d:'0'+d}-${month[m]}-${y.slice(2)}`;
    }

    const returnRows = () => {
        if(data.length > 0) {
            let arr = data.map((score, i) => {
                const avatarProps = {
                    style : { backgroundColor: theme.colors.white},
                    size : 50,
                    source : {uri: score.image},
                }

                return (
                    <DataTable.Row key={i}>
                        <DataTable.Cell style={{flex:1}}><KufamText size={13}>{i+1}</KufamText></DataTable.Cell>
                        <DataTable.Cell style={{flex:1.5}}><Avatar.Image {...avatarProps} /></DataTable.Cell>
                        <DataTable.Cell style={{flex:3}}><KufamText size={16}>{score.playerName}</KufamText></DataTable.Cell>
                        <DataTable.Cell style={{flex:1}}><KufamText size={16}>{score.score}</KufamText></DataTable.Cell>
                        <DataTable.Cell style={{flex:2}}><KufamText size={14}>{formatDate(score.createdAt)}</KufamText></DataTable.Cell>
                    </DataTable.Row>
                ) ;
            })
            return arr ;
        }
        else
            return <MainView><ActivityIndicator color="#ffffff" size="large" /></MainView>
    }   

    return (
        <MainView contentContainerStyle={{ alignItems: 'center' }}>
            <KufamText>High Scores</KufamText>
            <DDView>
                <DropDownPicker style={{ marginBottom: 5}} open={filterOpen} value={filterBy} items={filterItems} setOpen={setFilterOpen} setValue={setFilterBy} setItems={setFilterItems} zIndex={3000} zIndexReverse={1000}/>
                <DropDownPicker style={{ marginTop: 5, marginBottom: 5}} open={modeOpen} value={gameMode} items={modeItems} setOpen={setModeOpen} setValue={setGameMode} setItems={setModeItems} zIndex={2000} zIndexReverse={2000}/>
                <DropDownPicker style={{ marginTop: 5, marginBottom: 5}} open={topicOpen} value={topic} items={topicItems} setOpen={setTopicOpen} setValue={setTopic} setItems={setTopicItems} zIndex={1000} zIndexReverse={3000}/>
            </DDView>
            <MainScrollView><ScoreTable>{ returnRows() }</ScoreTable></MainScrollView>
        </MainView>
    ) ;
}

export default HighScoreScreen ;