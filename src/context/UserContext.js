import {createContext, useState, useEffect} from 'react' ;
import { ToastAndroid } from 'react-native' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;

const UserContext = createContext() ;

const initSettings = {
    music: true,
    sfx: true, 
    vibrate: true,
}

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({}) ; 
    const [userToken, setUserToken] = useState('') ;
    const [topics, setTopics] = useState({}) ;
    const [gameData, setGameData] = useState({}) ;
    const [settings, setSettings] = useState(initSettings) ;

    const fetchUrl = 'https://api.myarth.in/' ;
    // const fetchUrl = 'http://192.168.0.100:8000/' ;

    useEffect( () => {
        AsyncStorage.getItem('@abUser')
        .then( data => {
            if(data)
                setUser(JSON.parse(data)) ;
            return AsyncStorage.getItem('@abUserToken') ;
        })
        .then( data2 => {
            if(data2)
                setUserToken(JSON.parse(data2)) ;
            return AsyncStorage.getItem('@abGameData') ;
        })
        .then( data3 => {
            if(data3)
                setGameData(JSON.parse(data3)) ;
            return AsyncStorage.getItem('@abSettings') ;
        })
        .then( data4 => {
            if(data4)
                setSettings(JSON.parse(data4)) ;
            else
                setSettings(JSON.stringify(initSettings)) ;
        })
        .catch( err => console.log(err)) ;
    }, [])

    useEffect( () => {
        fetch(`${fetchUrl}gameData`)
        .then(res => {
            if(res.ok)
                return res.json() ;
            throw Error(res.statusText) ;
        })
        .then( resp => {
            setGameData(resp) ;
            setTopics(resp.topics) ; 
            AsyncStorage.setItem('@abGameData', JSON.stringify(resp))
        }) 
        .catch( err  => console.log(err) ) ;
    },[])

    const loadUser = user => {
        if(user.user) {
            setUser(user.user) ;
            setUserToken(user.token) ;
            AsyncStorage.setItem('@abUser', JSON.stringify(user.user))
            AsyncStorage.setItem('@abUserToken', JSON.stringify(user.token))
        }   
        else {
            setUser({}) ;
            setUserToken('') ;
            AsyncStorage.multiRemove(['@abUser', '@abUserToken']) ;
        }
    }

    const loadSettings = obj => {
        setSettings(obj) ;
        AsyncStorage.setItem('@abSettings', JSON.stringify(obj)) ;
        // console.log(settings) ;
    }

    const addGems = num => {
        console.log(num+' gems to be added') ;
        fetch(`${fetchUrl}users/addGems`, {
            method : 'post',
            headers : { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${userToken}`},
            body : JSON.stringify({gems: num}),
        })
        .then(res =>  res.json())
        .then(resp => { 
            // console.log(resp) ;  
            if(typeof resp === 'number') {
                setUser({...user, gems: resp}) ;
                AsyncStorage.setItem('@abUser', JSON.stringify({...user, gems: resp}))
            }
            else 
                throw resp ;
        })
        .catch( err  => {
            console.log(err) ;
            ToastAndroid.show(err, ToastAndroid.SHORT)
        }) ;
    }

    const updateSettings = obj => {
        // console.log(obj, 'obj') ;
        fetch(`${fetchUrl}user/settings`, {
            method : 'post',
            headers : { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${userToken}`},
            body : JSON.stringify(obj),
        })
        .then(res => res.json())
        .then(resp => { 
            // console.log(resp, 'resp')
            if(resp.avatars) {
                setUser({...user, settings: resp}) ;
                AsyncStorage.setItem('@abUser', JSON.stringify({...user, settings: resp}))
            }
            else 
                throw resp ;
        })
        .catch( err  => {
            console.log(err) ;
            ToastAndroid.show(err, ToastAndroid.SHORT)
        }) ;
    }
    
    return (
        <UserContext.Provider value={ { user, userToken, loadUser, gems: user.name?user.gems:0, addGems, topics, fetchUrl, updateSettings, gameData, settings, loadSettings } }>
            {children}
        </UserContext.Provider>
    ) ;
}

export {UserContext, UserContextProvider} ;