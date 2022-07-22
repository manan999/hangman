import { useState, useEffect, useContext } from 'react' ;
import { View, Text } from 'react-native' ;
import { DataTable, ActivityIndicator } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker' ;

import { UserContext } from '../../context/UserContext.js' ;
import { DDView, ScoreTable } from './cssHighScore.js' ;
import { MainView, KufamText, MainScrollView } from '../../../cssApp.js' ;

const HighScoreScreen = ({navigation, route}) => {
    const [filterBy, setFilterBy] = useState('all') ;
    const [filterOpen, setFilterOpen] = useState(false) ;
    const [filterItems, setFilterItems] = useState([{label: 'Show For : All', value: 'all'}, {label: 'Show For : Only Me', value: 'me'} ]) ;

    const [topic, setTopic] = useState('Movies') ;
    const [topicOpen, setTopicOpen] = useState(false) ;
    const [topicItems, setTopicItems] = useState([{label: 'Topic : Movies', value: 'Movies'} ]) ;

    const [gameMode, setGameMode] = useState('practice') ;
    const [modeOpen, setModeOpen] = useState(false) ;
    const [modeItems, setModeItems] = useState([{label: 'Mode : Practice', value: 'practice'}, {label: 'Mode : Challenge', value: 'challenge'} ]) ;
    
    const [data, setData] = useState([]) ;
    const {user, userToken} = useContext(UserContext) ;

    // console.log(data) ;

    useEffect( () => {
        setData([]) ;
        fetch(`https://web.myarthhardware.com/scores`, {
        // fetch('http://192.168.1.14:8000/scores' ,{
            method : 'post',
            headers : { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${userToken}`},
            body : JSON.stringify({filter: filterBy, topic, mode: gameMode}),
        })
        .then(res => {
            if(res.ok)
                return res.json() ;
            throw Error(res.statusText) ;
        })
        .then( data => setData(data) ) 
        .catch( err  => console.log(err) ) ;
    }, [filterBy, topic, gameMode])


    const formatDate = (dt) => {
        const date = new Date(dt).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}) ;
        const [ day, m, d, t, y ] = date.split(' ').filter(o=>o.length>0) ;
        return `${t.slice(0,5)}, ${d} ${m} ${y}`;
    }

    const returnRows = () => {
        if(data.length > 0) {
            let arr = data.map((score, i) => {
                return (
                    <DataTable.Row key={i}>
                        <DataTable.Cell style={{flex:1}}><KufamText size={13}>{i+1}</KufamText></DataTable.Cell>
                        <DataTable.Cell style={{flex:2}}><KufamText size={16}>{score.playerName}</KufamText></DataTable.Cell>
                        <DataTable.Cell style={{flex:1}}><KufamText size={16}>{score.score}</KufamText></DataTable.Cell>
                        <DataTable.Cell style={{flex:3}}><KufamText size={14}>{formatDate(score.createdAt)}</KufamText></DataTable.Cell>
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