import { SvgUri } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons'; 

const Cross = ({color}) => {
	const str = color?"red":"grey" ;
	return <Ionicons name="heart" size={24} color={str} />
}

const Gem = ({size=18}) => {
	return <SvgUri width={`${size}px`} height={`${size}px`} uri="https://www.svgrepo.com/download/54960/diamond.svg" /> ;
}

const Icon = ({type, size=18}) => {
	const links = {
		key : "https://www.svgrepo.com/download/69696/key.svg", 
		gear : "https://www.svgrepo.com/download/219818/gear.svg",
		phone : "https://www.svgrepo.com/download/210443/phone-call-telephone.svg",
		thanks : "https://www.svgrepo.com/download/280954/flower.svg",
		web : "https://www.svgrepo.com/download/271174/chrome.svg",
		email: "https://www.svgrepo.com/download/271158/gmail.svg",
		fb: "https://www.svgrepo.com/download/271139/facebook.svg",
		ig: "https://www.svgrepo.com/download/271143/instagram.svg",
		li: "https://www.svgrepo.com/download/271162/linkedin.svg",
		yt: "https://www.svgrepo.com/download/271152/youtube.svg",
		tw: "https://www.svgrepo.com/download/271144/twitter.svg",
	}

	return <SvgUri width={`${size}px`} height={`${size}px`} uri={links[type]} /> ;
}


export { Cross, Gem, Icon } ;