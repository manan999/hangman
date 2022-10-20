import { useState, useEffect } from 'react' ;
import { Button } from 'react-native' ;
import { RewardedAd, AdEventType, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import {MainView, KufamText} from '../../../cssApp.js' ;

// const adUnitId = TestIds.REWARDED ;
// const adUnitId = 'ca-app-pub-7668722490423187~3277091688' ;
const adUnitId = 'ca-app-pub-7668722490423187/3649567094' ;

const ShopScreen = ({navigation, route}) => {
    const [loaded, setLoaded] = useState(false);

    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // console.log('trying to load ad', rewarded) ;

        const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR, error => {
            console.log('ad error ', error)
            // setLoaded(true);
        });

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            console.log('ad loaded ', adUnitId)
            setLoaded(true);
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
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