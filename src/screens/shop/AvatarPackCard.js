import { useState, useContext } from 'react' ;
import { Image, View, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native' ;
import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native' ;

import Popup from '../../comps/popup/Popup.js' ;
import { GreenButton } from '../game/cssGameScreen.js' ;
import { Gem } from '../../comps/icons.js' ;
import { KufamText, WhiteButton, BlackKufam } from '../../../cssApp.js' ;
import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;

const AvatarPackView = styled.View` 
	width: 50% ;
	padding: 10px ;
 ` ;

const AvatarPack = styled.View` 
	background-color: ${ ({theme}) => theme.colors.halfBlack } ;
	border-radius: 10px ;
	padding: 10px 10px 25px ;
	align-items: center ;
 ` ;

const AvatarImage = styled.Image` 
	resize-mode: contain ;
	width: 130px ;
	height: 130px ;
	border-radius: 25px ;
	margin: 0 0 20px 0 ;
 ` ;

const scrollStyle = {
	paddingHorizontal: 0, 
	flexDirection: 'row', 
	flexWrap: 'wrap',
	justifyContent: 'space-evenly',
} ;

const AvatarPackCard = ({name, image, list, cost}) => {
    const {user, updateSettings} = useContext(UserContext) ;
    const {settings} = user ;
	const [popOpen, setPopOpen] = useState(false) ;

	const returnImages = () => {
		return list.map( one => {
			const avatarProps = {
				style : {backgroundColor: theme.colors.white},
				size : 140,
				source : {uri: `https://api.myarth.in/static/hangman/avatar/${one}.webp`},
			}

			return <Avatar.Image key={one} {...avatarProps}/> ;
		}) ;
	}

	const returnPurchaseBtn = () => {
		const {avatarPacks} = settings ;
		if(avatarPacks && avatarPacks.includes(name))
			return <WhiteButton mode="contained" icon="close" size={14}>Purchased</WhiteButton>
		else 
			return <WhiteButton mode="contained" icon="diamond-stone" onPress={() => setPopOpen(true)} size={14}>{cost>0?cost:'FREE'}</WhiteButton>
	}

	return (
		<AvatarPackView>
			<AvatarPack>
				<KufamText size={16}>{name}</KufamText>
				<TouchableOpacity onPress={() => setPopOpen(true)}>
					<AvatarImage source={{uri: image}} />
				</TouchableOpacity>
				{ returnPurchaseBtn() }
			</AvatarPack>
			<Popup visible={popOpen} onClose={() => setPopOpen(false)} thin>
                <BlackKufam size={20}> {name} </BlackKufam>
                <ScrollView contentContainerStyle={scrollStyle}>{returnImages()}</ScrollView>
                <GreenButton dark={false} icon="diamond-stone" mode="contained" onPress={() => {
                	updateSettings({...settings, avatars: [...settings.avatars, ...list], avatarPacks: settings.avatarPacks?[...settings.avatarPacks, name]:[name]}) ;
                	setPopOpen(false) ; 
                	ToastAndroid.show("Avatar Pack Purchased", ToastAndroid.LONG)
                }}>{cost>0?cost:'FREE'}</GreenButton>
            </Popup>
		</AvatarPackView>
	) ;
}

export default AvatarPackCard ;