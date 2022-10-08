import {createContext, useState, useEffect} from 'react' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;

const UserContext = createContext() ;

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({}) ; 
    const [userToken, setUserToken] = useState('') ;
    const [topics, setTopics] = useState({}) ;

    // const fetchUrl = 'https://api.myarth.in/' ;
    const fetchUrl = 'http://192.168.0.103:8000/' ;

    useEffect( () => {
        AsyncStorage.getItem('@abUser')
        .then( data => {
            if(data)
                setUser(JSON.parse(data)) ;
            return AsyncStorage.getItem('@abUserToken')
        })
        .then( data2 => {
            if(data2)
                setUserToken(JSON.parse(data2)) ;
        })
        .catch( err => console.log(err)) ;
    }, [])

    useEffect( () => {
        fetch(`${fetchUrl}topicList`)
        .then(res => {
            if(res.ok)
                return res.json() ;
            throw Error(res.statusText) ;
        })
        .then( resp => setTopics(resp) ) 
        .catch( err  => console.log(err) ) ;
    },[])

    const loadUser = (user) => {
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

    const addGems = (num) => {
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
    
    return (
        <UserContext.Provider value={ { user, userToken, loadUser, gems: user.name?user.gems:0, addGems, topics, fetchUrl } }>
            {children}
        </UserContext.Provider>
    ) ;
}

export {UserContext, UserContextProvider} ;