import { Linking } from 'react-native' ;

// import Img from '../../comps/img/Img.js' ;
import { BlackKufam, KufamText } from '../../../cssApp.js' ;
import { GreenButton } from '../game/cssGameScreen.js' ;

const BackPop = ({onPress}) => {
	return ( 
		<>
			<BlackKufam size={20}>Exit this Game ?</BlackKufam>
			<GreenButton dark={false} icon="check" mode="contained" onPress={onPress}>Yes</GreenButton>
	  	</>
	) ;
}

const RevivePop = ({onYesPress, onNoPress}) => {
	return ( 
		<>
			<BlackKufam size={20}> Reset this word, by watching an Ad ? </BlackKufam>
            <GreenButton dark={false} icon="video-vintage" mode="contained" onPress={onYesPress}> Watch Video </GreenButton>
            <GreenButton dark={false} icon="cancel" mode="contained" onPress={onNoPress}> No </GreenButton>
        </>
	) ;
}

export {BackPop, RevivePop} ;