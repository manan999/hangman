import { useContext } from 'react' ;
import { Linking, TouchableOpacity } from 'react-native' ;
import { Switch } from 'react-native-switch';
import styled from 'styled-components/native' ;

import Img from '../../comps/img/Img.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { Icon } from '../../comps/icons.js' ;
import { MainScrollView, P, Row } from '@comps' ;

const SettingsScreen = ({navigation, route}) => {
    const {settings, loadSettings} = useContext(UserContext) ;

    const toggle = (str) => loadSettings({...settings, [str] : !(settings[str]) });

    return (
        <MainScrollView>
            <SettingsView>
                <Row jc="center" gap={12}>
                    <Icon type="gear" size={24}/>
                    <P color="white">Settings</P>
                </Row>
                <BlackRow jc="space-between" mb={10}>
                    <P color="white" size={18}>Music</P>
                    <Switch value={settings.music} onValueChange={()=>toggle('music')} backgroundActive='#13542f' />
                </BlackRow>
                <BlackRow jc="space-between" mb={10}>
                    <P color="white" size={18}>Sound Effects</P>
                    <Switch value={settings.sfx} onValueChange={()=>toggle('sfx')} backgroundActive='#13542f' />
                </BlackRow>
                <BlackRow jc="space-between" mb={40}>
                    <P color="white" size={18}>Vibration</P>
                    <Switch value={settings.vibrate} onValueChange={()=>toggle('vibrate')} backgroundActive='#13542f' />
                </BlackRow>
                <ImgCon onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.myarth.aurbatao')}>
                    <Img src={require('../../../assets/rate.png')} />
                </ImgCon>
                <ImgCon onPress={()=> Linking.openURL('mailto:myarth.tech@gmail.com')}>
                    <Img src={require('../../../assets/write.png')} />
                </ImgCon>
                <ImgCon onPress={()=> Linking.openURL('https://myarth.in')}>
                    <Img src={require('../../../assets/visit.png')} />
                </ImgCon>
                <SocialView>
                    <Row>
                        <TouchableOpacity onPress={()=> Linking.openURL("https://www.youtube.com/@myarthtech8633")}>
                            <Icon type="yt" size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/myarth.tech')}>
                            <Icon type="fb" size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Linking.openURL('https://www.linkedin.com/company/myarthtech/')}>
                            <Icon type="li" size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Linking.openURL("https://www.instagram.com/myarthtech/")}>
                            <Icon type="ig" size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Linking.openURL("https://twitter.com/MyarthTech")}>
                            <Icon type="tw" size={40} />
                        </TouchableOpacity>
                    </Row>
                </SocialView>
                <ContactView>
                    <Row jc="center">
                        <Icon type="thanks" size={20}/>
                        <P color="white" size={16}>&emsp;Credits&emsp;</P>
                        <P color="white" size={12}>(Click to Visit)</P>
                    </Row>
                    <Row>
                        <TouchableOpacity onPress={()=> Linking.openURL('https://www.freepik.com/vectors/people-set')}><Small color="white" size={12}>Free Avatars</Small></TouchableOpacity>
                        <TouchableOpacity onPress={()=> Linking.openURL('https://soundcloud.com/arthurvost')}><Small color="white" size={12}>Background Music</Small></TouchableOpacity>
                    </Row>
                </ContactView>
            </SettingsView>
        </MainScrollView>
    ) ;
}

export default SettingsScreen ;

/*CSS*/

const SettingsView = styled.View` 
    align-self: stretch ;
    background-color: ${ ({theme}) => theme.colors.halfMain } ;
 ` ;

const ContactView = styled.View` 
    align-items: center ;
 ` ;

const SocialView = styled.View` 
    align-items: center ;
    margin: 20px 0;
 ` ;

const BlackRow = styled(Row)` 
    padding: 0 30px ;
    background-color: ${ ({theme}) => theme.colors.halfBlack }
 ` ;

const Small = styled(P)` 
    margin: 5px 0 ;
 ` ;

const ImgCon = styled.TouchableOpacity` 
    margin: 10px 0 ;
 ` ;