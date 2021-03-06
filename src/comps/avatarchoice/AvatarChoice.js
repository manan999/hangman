import { useState } from 'react' ;
import { TouchableOpacity, View, ScrollView } from 'react-native' ;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dialog, Portal, Avatar } from 'react-native-paper';

import CircleButton from '../circlebutton/CircleButton.js' ;
import { AvatarView, AvatarButtonView } from './cssAvatar.js' ;
import { theme } from '../../theme.js' ;

const scrollStyle = {
	paddingHorizontal: 12, 
	flexDirection: 'row', 
	flexWrap: 'wrap',
	justifyContent: 'space-between',
} ;

const AvatarChoice = ({url, setUrl}) => {
	const [dialog, setDialog] = useState(false) ;

	const showDialog = () => setDialog(true) ;
	const hideDialog = () => setDialog(false) ;

	const returnImages = () => {
		return [...Array(32).keys()].map( one => {
			const str = `https://raw.githubusercontent.com/manan999/images/master/hangman/avatar/${one+1}.webp` ;

			const avatarProps = {
				style : { backgroundColor: theme.colors.white},
				size : 120,
				source : {uri: str},
			}

			return <TouchableOpacity key={one} onPress={() => {
				setUrl(str) ;
				hideDialog() ;
			}}><Avatar.Image {...avatarProps}/></TouchableOpacity>
		}) ;
	}

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
}

export default AvatarChoice ;