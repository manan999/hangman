import { useState, useEffect } from 'react' ;
import { Dimensions, Image, TouchableOpacity } from 'react-native' ;
import styled from 'styled-components/native' ;

const wwd = Dimensions.get('window').width;

const Imag = styled.Image`
	resize-mode: contain ;
	width: ${({max})=>max}px ;
	height: ${ ({wd, ht, max}) => ht / (wd/max) }px ;
` ;

const Img = ({src, onPress, max=1}) => {
	const [ht, setHt] = useState(0) ;
	const [wd, setWd] = useState(0) ;

	useEffect( () => {
		Image.getSize(src.uri, (w, h) => {
			setHt(h) ;
			setWd(w) ;
		}, err => console.log(err)) ;
	}, [])

	if(ht > 0 && wd > 0)
		if(onPress)
			return <TouchableOpacity onPress={onPress}><Imag source={{ uri: src.uri}} ht={ht} wd={wd} max={wwd*max}/></TouchableOpacity>
		else
			return <Imag source={{ uri: src.uri}} ht={ht} wd={wd} max={wwd*max}/> ;
	else return null ;
}

export default Img ;