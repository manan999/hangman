import * as Animatable from 'react-native-animatable';

const AnimateView = ({children, anim='fadeIn', delay=1000}) => {
	return <Animatable.View animation={anim} delay={delay}>{children}</Animatable.View> ;
}

export default AnimateView ;