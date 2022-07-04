import { useState, useEffect } from 'react' ;
import { View, Text } from 'react-native' ;
import DropDownPicker from 'react-native-dropdown-picker' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;

import {MainView, KufamText} from '../../../cssApp.js' ;
import {SettingsView} from './cssSettings.js' ;

const SettingsScreen = ({navigation, route}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'English', value: 'english'},
        {label: 'Hindi', value: 'hindi'}
    ]);

    useEffect( () => {
        AsyncStorage.getItem('@abLanguage')
        .then( data => {
            if(data)
                setValue(data) ;
            else
                setValue('english') ;
        })
        .catch( err => console.log(err)) ;
    }, [])

    useEffect( () => {
        if(value) {
            AsyncStorage.setItem('@abLanguage', value)
            .then( data => console.log('language changed successfully'))
            .catch(err => console.log(err)) ;
        }
    }, [value] )

    return (
        <MainView>
            <KufamText>Settings</KufamText>
            <SettingsView>
                <KufamText size={18}>Select Language:</KufamText>
                <DropDownPicker open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} />
            </SettingsView>
        </MainView>
    ) ;
}

export default SettingsScreen ;