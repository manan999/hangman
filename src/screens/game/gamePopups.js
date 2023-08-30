import { useState, useEffect } from 'react' ;
import { RewardedAd, AdEventType, RewardedAdEventType/*, TestIds*/ } from 'react-native-google-mobile-ads';
// import crashlytics from '@react-native-firebase/crashlytics';

import { BlackKufam } from '../../../cssApp.js' ;
import { GreenButton } from '../game/cssGameScreen.js' ;
import { theme } from '../../theme.js' ;

// const adUnitId = TestIds.REWARDED ;
const adUnitId = 'ca-app-pub-7668722490423187/3649567094' ;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const BackPop = ({onPress}) => {
	return ( 
		<>
			<BlackKufam size={20}>Exit this Game ?</BlackKufam>
			<GreenButton buttonColor={theme.colors.darkGreen} color={theme.colors.white} mw={100} icon="check" mode="contained" onPress={onPress}>Yes</GreenButton>
	  	</>
	) ;
}

const RevivePop = ({onYesPress, onNoPress}) => {
	const [loaded, setLoaded] = useState(false) ;

	useEffect(() => {
        console.log('trying to load ad') ;

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
                onYesPress() ;
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

    const adButton = (rewardType) => {
        if(!loaded)
            return <GreenButton buttonColor={theme.colors.darkGreen} color={theme.colors.white} mw={100} loading mode="contained"> Ad Loading... </GreenButton> ;
        else 
            return <GreenButton buttonColor={theme.colors.darkGreen} color={theme.colors.white} mw={100} icon="video-vintage" mode="contained" onPress={() => rewarded.show()}> Watch Video </GreenButton> ;
    }

	return ( 
		<>
			<BlackKufam size={20}> Reset this word, by watching an Ad ? </BlackKufam>
            {adButton()}
            <GreenButton buttonColor={theme.colors.darkGreen} color={theme.colors.white} mw={100} icon="cancel" mode="contained" onPress={onNoPress}> No </GreenButton>
        </>
	) ;
}

export {BackPop, RevivePop} ;