import { useState, useEffect } from 'react' ;
import { Dimensions, Image } from 'react-native' ;
import styled from 'styled-components/native' ;

import {theme} from '../../theme.js' ;

const wwd = Dimensions.get('window').width;

const Imag = styled.Image`
	resize-mode: contain ;
	width: ${wwd}px ;
	height: ${ ({wd, ht}) => ht / (wd/wwd) }px ;
` ;

const Img = ({src}) => {
	const [ht, setHt] = useState(0) ;
	const [wd, setWd] = useState(0) ;

	useEffect( () => {
		let data = Image.resolveAssetSource(src) ;
		setHt(data.height) ;
		setWd(data.width) ;
	}, [])

	if(ht > 0 && wd > 0)
		return <Imag source={src} ht={ht} wd={wd}/> ;
	else return null ;
}

export default Img ;