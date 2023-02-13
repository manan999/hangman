import { useContext } from 'react' ;
import { Linking, TouchableOpacity } from 'react-native' ;
// import { Switch } from 'react-native-paper';
import { Switch } from 'react-native-switch';
import styled from 'styled-components/native' ;

import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;
import { MainScrollView, KufamText, Row } from '../../../cssApp.js' ;
import { Icon } from '../../comps/icons.js' ;

const SettingsScreen = ({navigation, route}) => {
    const {settings, loadSettings} = useContext(UserContext) ;

    const toggle = (str) => loadSettings({...settings, [str] : !(settings[str]) });

    return (
        <MainScrollView>
            <Row  jc="center">
                <Icon type="gear" size={35}/>
                <KufamText>&emsp;Settings&emsp;</KufamText>
            </Row>
            <SettingsView>
                <BlackRow jc="space-between" mb={10}>
                    <KufamText size={20}>Music</KufamText>
                    <Switch value={settings.music} onValueChange={()=>toggle('music')} backgroundActive={'#13542f'}/>
                </BlackRow>
                <BlackRow jc="space-between" mb={10}>
                    <KufamText size={20}>Sound Effects</KufamText>
                    <Switch value={settings.sfx} onValueChange={()=>toggle('sfx')} backgroundActive={'#13542f'}/>
                </BlackRow>
            </SettingsView>
            <ContactView>
                <Row  jc="center">
                    {/*<Icon type="phone" size={35}/>*/}
                    <KufamText>&emsp;Get In Touch&emsp;</KufamText>
                </Row>
                {/*<BlackRow jc="space-between" mb={10}>
                    <KufamText size={20}>Visit Website</KufamText>
                    <TouchableOpacity onPress={()=> Linking.openURL('https://myarth.in')}>
                        <Icon type="web" size={50} />
                    </TouchableOpacity>
                </BlackRow>
                <BlackRow jc="space-between" mb={10}>
                    <KufamText size={20}>Write to Us</KufamText>
                    <TouchableOpacity onPress={()=> Linking.openURL("mailto:myarth.tech@gmail.com")}>
                        <Icon type="email" size={50} />
                    </TouchableOpacity>
                </BlackRow>*/}
                <Row>
                    <TouchableOpacity onPress={()=> Linking.openURL('https://myarth.in')}>
                        <Icon type="web" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Linking.openURL("mailto:myarth.tech@gmail.com")}>
                        <Icon type="email" size={50} />
                    </TouchableOpacity>
                </Row>
            </ContactView>
            <SocialView>
                <Row jc="center">
                    <KufamText>&emsp;Follow Us</KufamText>
                </Row>
                <Row>
                    <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/myarth.tech')}>
                        <Icon type="fb" size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Linking.openURL("https://www.youtube.com/@myarthtech8633")}>
                        <Icon type="yt" size={40} />
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
                    <Icon type="thanks" size={25}/>
                    <KufamText size={20}>&emsp;Credits&emsp;</KufamText>
                    <KufamText size={14}>(Click to Visit)</KufamText>
                </Row>
                <Row >
                    <TouchableOpacity onPress={()=> Linking.openURL('https://www.freepik.com/vectors/people-set')}><Small size={14}>Free Avatars</Small></TouchableOpacity>
                    <TouchableOpacity onPress={()=> Linking.openURL('https://soundcloud.com/arthurvost')}><Small size={14}>Background Music</Small></TouchableOpacity>
                </Row>
            </ContactView>
        </MainScrollView>
    ) ;
}

export default SettingsScreen ;

/*CSS*/

const SettingsView = styled.View` ` ;

const ContactView = styled.View` 
    align-items: center ;
 ` ;

const SocialView = styled.View` 
    align-items: center ;
    margin-bottom: 30px ;
 ` ;

const WhiteRow = styled(Row)` 
    padding: 8px 30px ;
    background-color: ${ ({theme}) => theme.colors.halfWhite }
 ` ;

const BlackRow = styled(Row)` 
    padding: 0 30px ;
    background-color: ${ ({theme}) => theme.colors.halfBlack }
 ` ;

const Small = styled(KufamText)` 
    margin: 5px 0 ;
 ` ;