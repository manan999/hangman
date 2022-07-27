import { SvgUri } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons'; 

// const Cross = () => <SvgUri width="20px" height="20px" uri="https://www.svgrepo.com/download/286496/cross.svg" />
const Cross = ({color}) => {
	const str = color?"red":"grey" ;
	return <Ionicons name="md-heart" size={24} color={str} />
}

const Gem = ({size=18}) => {
	return <SvgUri width={`${size}px`} height={`${size}px`} uri="https://www.svgrepo.com/download/247990/diamond.svg" /> ;
}

export { Cross, Gem } ;