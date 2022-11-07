import Img from '../../comps/img/Img.js' ;
import { GreenButton } from '../game/cssGameScreen.js' ;

const SignUpPop = ({onSignUpPress}) => {
	return ( 
		<>
			<Img src={require('../../../assets/sign-up.png')} max={0.9} onPress={onSignUpPress}/>
            <GreenButton dark={false} icon="account-plus" mode="contained" onPress={onSignUpPress}> Sign Up </GreenButton>
        </>
	) ;
}

export {SignUpPop} ;