import { useState } from 'react' ;
import { View, Text } from 'react-native' ;
import DropDown from "react-native-paper-dropdown";

import {MainView, KufamText} from '../../../cssApp.js' ;

const list = ['english', 'hinglish'] ;

const SettingsScreen = ({navigation, route}) => {
    const [showSelectDropDown, setShowSelectDropDown] = useState(false) ;
    const [lang, setLang] = useState('english') ;

    return (
        <MainView>
            <KufamText>Select Tutorial Language</KufamText>
            <DropDown label="Language" mode="outlined" visible={showSelectDropDown} showDropDown={() => setShowSelectDropDown(true)} onDismiss={() => setShowSelectDropDown(false)} value={lang} setValue={setLang} list={list} />
        </MainView>
    ) ;
}

export default SettingsScreen ;