import { useState, useEffect, useContext } from 'react' ;
import { RewardedAd, AdEventType, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Avatar } from 'react-native-paper';
import crashlytics from '@react-native-firebase/crashlytics';

import { MainScrollView, KufamText, WhiteButton, Row } from '../../../cssApp.js' ;
import { GemChest, ChestCon } from './cssShop.js' ;
import { Gem, Key } from '../../comps/icons.js' ;
import { theme } from '../../theme.js' ;
import { UserContext } from '../../context/UserContext.js' ;

const adUnitId = TestIds.REWARDED ;
// const adUnitId = 'ca-app-pub-7668722490423187/3649567094' ;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


const ShopScreen = ({navigation, route}) => {
    const {user, gems, addGems} = useContext(UserContext) ;
    const [loaded, setLoaded] = useState(false) ;
    const [reward, setReward] = useState('gem') ;

    useEffect(() => {
        if(rewarded._loaded) 
            setLoaded(true) ;
    }, [])

    useEffect(() => {
        console.log('trying to load ad') ;

        const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR, error => {
            console.log('ad error ', error) ;
            crashlytics().log('ad error ', error) ;
        });

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
            console.log('ad loaded ', adUnitId) ;
            crashlytics().log('ad loaded ', adUnitId) ;
        });

        const unsubscribeClose = rewarded.addAdEventListener(AdEventType.CLOSED, error => {
            console.log('ad closed') ;
            crashlytics().log('ad closed') ;
            setLoaded(false);
       
            //reload ad 
            rewarded.load();
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            rew => {
                console.log('User earned reward of ', rew);

                if(rew.amount)
                    addGems(25) ;

                crashlytics().log('User earned reward of ', rew) ;
            },
        );

        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded() ;
          unsubscribeEarned() ;
          unsubscribeClose() ;
          unsubscribeError() ;
        };
    }, []);

    const adButton = (rewardType) => {
        if(!loaded)
            return <KufamText size={14}>Ad Not Available</KufamText> ;
        else 
            return <WhiteButton color={theme.colors.white} mode="contained" onPress={() => { 
                setReward(rewardType) ;
                rewarded.show(); 
            }} size={14}> Watch Video </WhiteButton> ;
    }

    const avatarProps = {
        style : { backgroundColor: theme.colors.white},
        size : 80,
        source : {uri: user.image},
    }

    return (
        <MainScrollView contentContainerStyle={ {alignItems: 'center'} }>
            <KufamText>SHOP</KufamText>
            <Row>
                <Avatar.Image {...avatarProps} /> 
                <KufamText size={20} > <Gem size={16}/> {gems} </KufamText> 
                <KufamText size={20} > <Key size={16}/> 0 </KufamText> 
            </Row>
            <ChestCon>
                <KufamText size={18}>Watch an Ad to earn <Gem size={16}/> 25 </KufamText>
                <GemChest source={require('../../../assets/gems.webp')} />
                {adButton('gem')}
                <KufamText size={18}>Watching Ads will increase your reward</KufamText>
            </ChestCon>
            {/*<ChestCon>
                <KufamText size={18}>Watch Videos to earn <Key size={16}/> 1 </KufamText>
                <GemChest source={require('../../../assets/gems.webp')} />
                {adButton('key')}
            </ChestCon>*/}
        </MainScrollView>
    ) ;
}

export default ShopScreen ;