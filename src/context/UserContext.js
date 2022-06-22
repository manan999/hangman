import {createContext, useState, useEffect} from 'react' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;

const UserContext = createContext() ;

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({}) ; 
    const [userToken, setUserToken] = useState('') ;

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
    
    return (
        <UserContext.Provider value={ { user, userToken, loadUser } }>
            {children}
        </UserContext.Provider>
    ) ;
}

export {UserContext, UserContextProvider} ;