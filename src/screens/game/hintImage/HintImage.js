import {useState, useEffect} from 'react' ;
import { Image, TouchableOpacity } from 'react-native';

import Popup from '../../../comps/popup/Popup.js' ;
import { P } from '@comps' ;

const HintImage = ({topic='', name='', single}) => {
	const [uri, setUri] = useState(`https://api.myarth.in/static/hangman/hints/${topic}/${name}.webp`) ;
	const [size, setSize] = useState({}) ;
	const [popOpen, setPopOpen] = useState(false) ;

	const comingSoon = 'https://api.myarth.in/static/images/marvel/cs2.webp' ;

	useEffect(() => {
		Image.getSize(uri, (w, h) => {
			setSize({ h8: h/(w/80), h20: h/(w/200) }) ;
		});
	}, [uri])

	if(single)
		return <Image style={{height: size.h20, width: 200, borderRadius: 5, marginBottom: 15, resizeMode: 'contain'}} source={{ uri }} onError={() => setUri(comingSoon)}/>
	else
		return (
			<>	
				<TouchableOpacity onPress={() => setPopOpen(true)}>	
					<Image style={{height: size.h8, width: 80, borderRadius: 5, resizeMode: 'contain'}} source={{ uri }} onError={() => setUri(comingSoon)}/>
				</TouchableOpacity>
				<Popup visible={popOpen} onClose={() => setPopOpen(false)}>
	  				<Image style={{height: size.h20, width: 200, borderRadius: 5, marginBottom: 15, resizeMode: 'contain'}}  source={{ uri }} onError={() => setUri(comingSoon)}/>
	  				<P size={20} cap>{name}</P>
	  			</Popup> 
			</>
		);
}

export default HintImage ;