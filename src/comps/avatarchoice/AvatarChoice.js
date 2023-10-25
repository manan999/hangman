import { useState } from 'react' ;
import { TouchableOpacity, ScrollView, Dimensions } from 'react-native' ;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dialog, Portal, Avatar, ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native' ;

import CircleButton from '../circlebutton/CircleButton.js' ;
import { theme } from '@theme' ;

const wwd = Dimensions.get('window').width;

const scrollStyle = {
	paddingHorizontal: 12, 
	flexDirection: 'row', 
	flexWrap: 'wrap',
	justifyContent: 'space-between',
} ;

const AvatarView = styled.View`
  align-self: center ;
  position: relative ;
` ;

const AvatarButtonView = styled.View`
  position: absolute ;
  bottom: 0 ;
  right: 0 ;
` ;


const AvatarChoice = ({url, setUrl, data = []}) => {
	const [dialog, setDialog] = useState(false) ;

	const showDialog = () => setDialog(true) ;
	const hideDialog = () => setDialog(false) ;

	const returnImages = () => {
		return data.map( one => {
			const str = `https://api.myarth.in/static/hangman/avatar/${one}.webp` ;

			const avatarProps = {
				style : { backgroundColor: theme.colors.white},
				size : wwd*0.3,
				source : {uri: str},
			}

			return <TouchableOpacity key={one} onPress={() => {
				setUrl(str) ;
				hideDialog() ;
			}}><Avatar.Image {...avatarProps}/></TouchableOpacity>
		}) ;
	}

	if(url)
		return (
			<AvatarView>
				<TouchableOpacity onPress={showDialog}>
					<Avatar.Image style={{ backgroundColor: theme.colors.white}} size={120} source={{uri: url}} />
				</TouchableOpacity>
				<AvatarButtonView>
					<CircleButton onButtonPress={showDialog} size={35} >
						<MaterialCommunityIcons name="pencil" size={26} color={theme.colors.main} />
		            </CircleButton>
				</AvatarButtonView>
				<Portal>
		          	<Dialog visible={dialog} onDismiss={hideDialog}>
		            	<Dialog.Title>Select Avatar</Dialog.Title>
			            <Dialog.ScrollArea>
				          	<ScrollView contentContainerStyle={scrollStyle}>{returnImages()}</ScrollView>
				        </Dialog.ScrollArea>
		            </Dialog>
		        </Portal>
			</AvatarView>
		) ;
	else 
		return <ActivityIndicator color="#fffff" size="large" /> ;
}

export default AvatarChoice ;