import {useState, useEffect} from 'react' ;
import { Image, TouchableOpacity } from 'react-native';

import Popup from '../../../comps/popup/Popup.js' ;
import { BlackKufam } from '../../../../cssApp.js' ;

const HintImage = ({topic='', name=''}) => {
	const [uri, setUri] = useState(`https://raw.githubusercontent.com/manan999/images/master/hangman/hints/${topic}/${name}.webp`) ;
	const [popOpen, setPopOpen] = useState(false) ;

	return (
		<>	
			<TouchableOpacity onPress={() => setPopOpen(true)}>	
				<Image style={{height: 80, width: 80, borderRadius: 5}} resizeMode="contain" source={{ uri }} onError={() => setUri('https://raw.githubusercontent.com/manan999/images/master/marvel/cs2.webp')}/>
			</TouchableOpacity>
			<Popup visible={popOpen} onClose={() => setPopOpen(false)}>
  				<Image style={{height: 200, width: 200, borderRadius: 5, marginBottom: 15}}  resizeMode="contain" source={{ uri }} onError={() => setUri('https://raw.githubusercontent.com/manan999/images/master/marvel/cs2.webp')}/>
  				<BlackKufam size={20} cap main> {name} </BlackKufam>
  			</Popup> 
		</>
	);
}

export default HintImage ;