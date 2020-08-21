import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../screens/SplashScreen/SplashScreen';
import SongNavigation from './SongNavigation';
// import Song from '../screens/SongSreen/SongScreen';
// import SongDetail from '../screens/SongDetailScreen/SongDetailScreen';

const AppNavigator = createSwitchNavigator(
  {
    Splash: {screen: Splash},
    SongNavigation: {screen: SongNavigation},
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
