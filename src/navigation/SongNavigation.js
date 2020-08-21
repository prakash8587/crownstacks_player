import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Song from '../screens/SongSreen/SongScreen';
import SongDetail from '../screens/SongDetailScreen/SongDetailScreen';

const songNavigator = createStackNavigator(
  {
    Song: {screen: Song},
    SongDetail: {screen: SongDetail},
  },
  {
    initialRouteName: 'Song',
    headerMode: 'none',
  },
);

export default songNavigator;
