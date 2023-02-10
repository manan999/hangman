import { SvgUri } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons'; 

const Cross = ({color}) => {
	const str = color?"red":"grey" ;
	return <Ionicons name="md-heart" size={24} color={str} />
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
		web : "https://www.svgrepo.com/download/474386/internet.svg",
		email: "https://www.svgrepo.com/download/262846/email-mail.svg",
		fb: "https://www.svgrepo.com/download/475647/facebook-color.svg",
		ig: "https://www.svgrepo.com/download/452229/instagram-1.svg",
		li: "https://www.svgrepo.com/download/354000/linkedin-icon.svg",
		yt: "https://www.svgrepo.com/download/475700/youtube-color.svg",
		tw: "https://www.svgrepo.com/download/475689/twitter-color.svg",
	}

	return <SvgUri width={`${size}px`} height={`${size}px`} uri={links[type]} /> ;
}


export { Cross, Gem, Icon } ;