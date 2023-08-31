import { Linking } from 'react-native' ;

import { Img, P, GreenButton } from '@comps' ;
import { theme } from '@theme' ;
import { signUp } from '@images' ;

const { darkGreen, white } = theme.colors ;

const SignUpPop = ({onSignUpPress}) => {
	return ( 
		<>
			<Img src={signUp} max={0.9} onPress={onSignUpPress}/>
            <GreenButton buttonColor={darkGreen} color={white} mw={100} icon="account-plus" mode="contained" onPress={onSignUpPress}> Sign Up </GreenButton>
        </>
	) ;
}

const UpdatePop = () => {
	return ( 
		<>
			<P size={18} font="popBold"> A new update is available, please update the app from Google Play Store</P>
            <GreenButton buttonColor={darkGreen} color={white} mw={100} icon="account-plus" mode="contained" onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.myarth.aurbatao')}> Update </GreenButton>
        </>
	) ;
}

export {SignUpPop, UpdatePop} ;