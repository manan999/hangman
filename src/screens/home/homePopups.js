import { Linking } from 'react-native' ;

import Img from '../../comps/img/Img.js' ;
import { BlackKufam } from '../../../cssApp.js' ;
import { GreenButton } from '../game/cssGameScreen.js' ;
import { theme } from '../../theme.js' ;

const SignUpPop = ({onSignUpPress}) => {
	return ( 
		<>
			<Img src={require('../../../assets/sign-up.png')} max={0.9} onPress={onSignUpPress}/>
            <GreenButton buttonColor={theme.colors.darkGreen} color={theme.colors.white} mw={100} icon="account-plus" mode="contained" onPress={onSignUpPress}> Sign Up </GreenButton>
        </>
	) ;
}

const UpdatePop = () => {
	return ( 
		<>
			<BlackKufam size={20}> A new update is available, please update the app from Google Play Store</BlackKufam>
            <GreenButton buttonColor={theme.colors.darkGreen} color={theme.colors.white} mw={100} icon="account-plus" mode="contained" onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.myarth.aurbatao')}> Update </GreenButton>
        </>
	) ;
}

export {SignUpPop, UpdatePop} ;