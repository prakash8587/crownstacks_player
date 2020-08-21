import React, {Component} from 'react';
import {View, Image} from 'react-native';

class SpalshScreen extends Component {
  componentDidMount() {
    this.navigateToSongScreen();
  }

  navigateToSongScreen = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Song');
    }, 5000);
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../../img/splash.png')}
          style={{
            width: 250,
            height: 250,
            borderRadius: 15,
          }}
        />
      </View>
    );
  }
}

export default SpalshScreen;
