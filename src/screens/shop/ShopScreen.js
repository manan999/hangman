import { useState, useEffect, useContext } from 'react' ;
import { RewardedAd, AdEventType, RewardedAdEventType/*, TestIds*/ } from 'react-native-google-mobile-ads';
import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native' ;
// import crashlytics from '@react-native-firebase/crashlytics';

import AvatarPackCard from './AvatarPackCard.js' ;
import { Gem, Icon } from '../../comps/icons.js' ;
import { theme } from '@theme' ;
import { UserContext } from '@uc' ;
import { MainScrollView, P, Button, Row, Img } from '@comps' ;

// const adUnitId = TestIds.REWARDED ;
const adUnitId = 'ca-app-pub-7668722490423187/3649567094' ;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const ShopScreen = ({navigation, route}) => {
    const {user, gems, addGems, /*updateSettings,*/ gameData} = useContext(UserContext) ;
    const {avatarPacks} = gameData ;
    // const {settings} = user ;
    // const {rewardVideos, todayVideos} = settings ;

    const [loaded, setLoaded] = useState(false) ;
    // const [reward, setReward] = useState('gem') ;
    // const [time, setTime] = useState(null) ;

    useEffect(() => {
        console.log('trying to load ad') ;
        // console.log(settings, 'settings') ;

        const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR, error => {
            console.log('ad error ', error) ;
            // crashlytics().log('ad error ', error) ;
        });

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
            console.log('ad loaded ', adUnitId) ;
            // crashlytics().log('ad loaded ', adUnitId) ;
        });

        const unsubscribeClose = rewarded.addAdEventListener(AdEventType.CLOSED, error => {
            console.log('ad closed', error) ;
            // crashlytics().log('ad closed') ;
            setLoaded(false);
       
            //reload ad 
            rewarded.load();
        });

        const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, rew => {
            console.log(`User earned reward of ${rew.amount} ${rew.type}`);

            if(rew.amount) {
                addGems(25) ;
                // setTime(time => new Date()) ;
            }

            // crashlytics().log('User earned reward of ', rew) ;
        });

        rewarded.load();

        if(rewarded._loaded) 
            setLoaded(true) ;

        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded() ;
          unsubscribeEarned() ;
          unsubscribeClose() ;
          unsubscribeError() ;
        };
    }, []);

    // useEffect( () => {
    //     if(time) {
    //         console.log(time, 'time useeffect') ;
    //         if(rewardVideos) {
    //             let d1 = time.toISOString().split('T')[0] ;
    //             let d2 = rewardVideos.slice(-1)[0].time.slice(0, 10) ;

    //             let tv = todayVideos>10?50:20+(3*todayVideos)

    //             if(d1 === d2) {
    //                 let rewardObj = { reward: tv, time }
    //                 console.log({...settings, todayVideos:todayVideos+1, rewardVideos:[...rewardVideos,rewardObj]}) ;
    //                 updateSettings({...settings, todayVideos:todayVideos+1, rewardVideos:[...rewardVideos,rewardObj]});
    //                 addGems(tv) ;
    //             }
    //             else {
    //                 console.log({d1, d2, tv, num : '2', settings}) ;
    //                 let rewardObj = { reward: 20, time }
    //                 updateSettings({...settings, todayVideos: 1, rewardVideos: [...rewardVideos, rewardObj] }) ;
    //                 addGems(20) ;
    //             }
    //         }
    //         else {
    //                 console.log({num : '3', settings}) ;
    //             updateSettings({...settings, todayVideos: 1, rewardVideos: [{ reward: 20, time }] }) ;
    //             addGems(20) ;
    //         }
    //     }
    // }, [time])

    const adButton = (rewardType) => {
        if(!loaded)
            return <P color="white" size={14}>Ad Not Available</P> ;
        else 
            return <Button buttonColor="white" color="main" mw={100} mode="contained" onPress={() => { 
                // setReward(rewardType) ;
                rewarded.show(); 
            }} size={14}> Watch Video </Button> ;
    }

    const avatarProps = {
        style : { backgroundColor: theme.colors.white},
        size : 80,
        source : {uri: user.image},
    }

    // let str = todayVideos?(todayVideos>10?50:20+(3*todayVideos)):20

    return (
        <MainScrollView contentContainerStyle={{ rowGap : 24 }}>
            <TitleCon>
                <P color="white">SHOP</P>
            </TitleCon>
            <Row>
                <Avatar.Image {...avatarProps} /> 
                <P color="white" size={20}> <Gem size={16}/> {gems} </P> 
                <P color="white" size={20}> <Icon type="key" size={16}/> 0 </P> 
            </Row>
            <ShopText color="white" size={22}>Gems</ShopText>
            <ChestCon>
                <P color="white" size={18}>Watch an Ad to earn <Gem size={16}/> {25} </P>
                <Img src={require('../../../assets/gems.webp')} max={0.7} />
                {adButton('gem')}
                <P color="white" size={18}>Watching Ads will increase your <Gem size={16}/> gems</P>
            </ChestCon>
            {/*<ChestCon>
                <P color="white" size={18}>Watch Videos to earn <Key size={16}/> 1 </P>
                <GemChest source={require('../../../assets/gems.webp')} />
                {adButton('key')}
            </ChestCon>*/}
            <ShopText color="white" size={22}>Avatar Packs</ShopText>
            <AvatarPackView>
                {avatarPacks.map(ap => <AvatarPackCard key={ap.name} {...ap} />)}
            </AvatarPackView>
        </MainScrollView>
    ) ;
}

export default ShopScreen ;

const TitleCon = styled.View`
    padding-top: 16px ;
` ;

const ChestCon = styled.View` 
	align-items: center ;
	gap: 12px ;
 ` ;

const ShopText = styled(P)` 
	background-color: ${ ({theme}) => theme.colors.quarterBlack } ;
	align-self: stretch ;
	padding: 10px 0 12px ;
 ` ;

const AvatarPackView = styled.View` 
	flex-direction: row ;
	flex-wrap: wrap ;
 ` ;