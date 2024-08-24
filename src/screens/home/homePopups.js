import { Linking } from 'react-native' ;

import { Img, P, GreenButton } from '@comps' ;
import { signUp } from '@images' ;

const btnProps = { buttonColor: 'darkGreen', mw : 100, mode: 'contained' } ;

const SignUpPop = ({onSignUpPress}) => {
	return ( 
		<>
			<Img src={signUp} max={0.9} onPress={onSignUpPress}/>
            <GreenButton {...btnProps} icon="account-plus" onPress={onSignUpPress}> Sign Up </GreenButton>
        </>
	) ;
}

const UpdatePop = () => {
	return ( 
		<>
			<P size={18} font="popMedium"> A new update is available, please update the app from Google Play Store</P>
            <GreenButton {...btnProps} icon="account-plus" onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.myarth.aurbatao')}> Update </GreenButton>
        </>
	) ;
}

export {SignUpPop, UpdatePop} ;