import * as Animatable from 'react-native-animatable';

const AnimateView = ({children, anim='fadeIn', delay=1000, iterationCount = 1, iterationDelay = 1000}) => {
	return <Animatable.View animation={anim} delay={delay} iterationCount={iterationCount} iterationDelay={iterationDelay}>{children}</Animatable.View> ;
}

export default AnimateView ;