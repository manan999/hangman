import { useState, useEffect } from 'react' ;
import { Button } from 'react-native' ;
import { RewardedAd, AdEventType, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import crashlytics from '@react-native-firebase/crashlytics';

import {MainView, KufamText} from '../../../cssApp.js' ;

const adUnitId = TestIds.REWARDED ;
// const adUnitId = 'ca-app-pub-7668722490423187/3649567094' ;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const ShopScreen = ({navigation, route}) => {
    
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // console.log('trying to load ad') ;

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
            reward => {
                console.log('User earned reward of ', reward);
                crashlytics().log('User earned reward of ', reward) ;
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

    const adButton = () => {
        if(!loaded)
            return null ;
        else 
            return <Button title="Show Rewarded Ad" onPress={() => { rewarded.show() }}/>
    }

    return (
        <MainView>
            <KufamText>SHOP</KufamText>
            {adButton()}
            <KufamText size={18}>To be available in next update</KufamText>
        </MainView>
    ) ;
}

export default ShopScreen ;