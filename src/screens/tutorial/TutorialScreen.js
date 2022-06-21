import { useState, useEffect } from 'react' ;
import {View} from 'react-native' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;

import {theme} from '../../theme.js' ;
import {MainView, DemoImage, DemoText, WhiteButton} from './cssTutorial.js' ;
import {Row} from '../../../cssApp.js' ;
import t1 from '../../../assets/tutorial/t1.webp' ;
import t2 from '../../../assets/tutorial/t2.webp' ;
import t3 from '../../../assets/tutorial/t3.webp' ;
import t4 from '../../../assets/tutorial/t4.webp' ;
import t5 from '../../../assets/tutorial/t5.webp' ;
import t6 from '../../../assets/tutorial/t6.webp' ;
import t7 from '../../../assets/tutorial/t7.webp' ;

const tutorialData = [{
        img: t1,
        english: "Title will tell you the Type of word to guess. In this example: Movies",
        hindi: "Title aapko batayega ki kaisa word guess karna hai, jaise yaha par: Movies"
    }, {
        img: t2,
        english: "This shows the guessed letters, Dashes ( _ ) denote the letters that are yet to be guessed",
        hindi: "Jo letters guess ho chuke hai unhe yaha dikhate hai, baaki sab ki jagah Dashes ( _ ) dikhate hai"
    }, {
        img: t3,
        english: "Keyboard shows which letters are already used. Here, A E I O U have been used",
        hindi: "Keyboard dikha raha hai ki konse letters use kiye ja chuke hai. Jaise yaha par A E I O U"
    }, {
        img: t7,
        english: "When you press a key, if it is correct, its Dash will be removed, otherwise you will lose a heart",
        hindi: "Jab aap koi key dabayenge, agar vo sahi hai to uska Dash hat jayega, nahi to ek heart chala jayega "
    }, {
        img: t4,
        english: "You will lose a round if you lose all hearts or Countdown reaches 0",
        hindi: "Agar aap sabhi hearts kho dete hai ya Countdown 0 tak pahuch jata hai to aap round haar jayenge",
    }, {
        img: t5,
        english: "Press the bulb to get a hint (2 per round), which help you to guess the word",
        hindi: "Bulb dabane se aapko hint mil jayega (2 prati round), jinse aap word guess kar payenge"
    }, {
        img: t6,
        english: "You can use Practice mode for unlimited fun and it has no Countdown",
        hindi: "Unlimited Fun ke liye aap Practice mode khel sakte hai aur usme Countdown bhi nahi hota hai",
    }
] ;

const TutorialScreen = ({navigation}) => {
    const [page, setPage] = useState(0) ;
    const [lang, setLang] = useState(null) ;

    useEffect( () => {
        AsyncStorage.getItem('@abLanguage')
        .then( data => setLang(data))
        .catch( err => console.log(err)) ;
    }, [])

    const returnBackButton = () => {
        if(page > 0)
            return <WhiteButton color={theme.colors.white} mode="contained" onPress={()=>setPage(page-1)}> Back </WhiteButton>
    }

    const returnNextButton = () => {
        return <WhiteButton color={theme.colors.white} mode="contained" onPress={()=>(page<6)?setPage(page+1):navigation.replace('Home')}> Next </WhiteButton>
    }

    return (
        <MainView>
            <DemoImage source={tutorialData[page].img} />
            <DemoText>{tutorialData[page][lang]}</DemoText>
            <Row>{returnBackButton()}{returnNextButton()}</Row>
        </MainView>
    ) ;
}

export default TutorialScreen ;