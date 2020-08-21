import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {styles} from './SongDetailScreenStyle';
import SeekBar from '../../component/Slider/Seekbar';
import SoundPlayer from 'react-native-sound-player';
import {connect} from 'react-redux';

let song = null;

class SongDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPause: false,
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      totalLen: 1,
      currentPos: 0,
      index: props.navigation.getParam('index'),
      endReached: false,
    };
    this.sliderEditing = false;
  }

  navigateToPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  playToggle = () => {
    const {isPause} = this.state;
    this.setState((prevState) => ({isPause: !prevState.isPause}));
    try {
      //Play from url
      this.getInfo();
      if (isPause) {
        SoundPlayer.resume();
        this.timer = setInterval(() => {
          this.tick();
        }, 1000);
      } else {
        SoundPlayer.pause();
        clearInterval(this.timer);
      }
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  getAudioTimeString(sec) {
    var minutes = Math.floor(sec / 60);
    var seconds = ((sec % 60) * 60).toFixed(0);
    return (
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds
    );
  }

  async getInfo() {
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('getInfo', this.getAudioTimeString(info.duration)); // {duration: 12.416, currentTime: 7.691}
      this.setState({totalLen: Math.ceil(info.duration)});
    } catch (e) {
      console.log('There is no song playing', e);
    }
  }

  tick = () => {
    this.setState((prevState) => ({currentPos: prevState.currentPos + 1}));
  };

  prevTrack = () => {
    let _index = this.state.index;
    if (_index > 0) {
      _index -= 1;
      song = this.props.songlistData && this.props.songlistData[_index];
      clearInterval(this.timer);
      this.setState({
        index: _index,
        currentPos: 0,
        isPause: false,
        endReached: false,
      });
      try {
        SoundPlayer.loadUrl(song.previewUrl);
      } catch (e) {}
    }
  };

  nextTrack = () => {
    let _index = this.state.index;
    const {songlistData} = this.props;
    if (_index < songlistData.length) {
      _index += 1;
      song = this.props.songlistData && this.props.songlistData[_index];
      clearInterval(this.timer);
      // this.setState({index: _index, currentPos: 0}, () => this.getInfo());
      this.setState({
        index: _index,
        currentPos: 0,
        isPause: false,
        endReached: false,
      });
      try {
        SoundPlayer.loadUrl(song.previewUrl);
      } catch (e) {}
    }
  };

  onseek(time) {
    time = Math.round(time);
    this.setState({
      currentPos: time,
      isPause: false,
    });
    SoundPlayer.seek(time);
  }

  componentDidMount() {
    const {currentPos, totalLen} = this.state;
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        console.log('finished playing', success);
        clearInterval(this.timer);
        this.setState({isPause: true, endReached: true});
        SoundPlayer.stop();
      },
    );
    this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        console.log('finished loading url', success, url);
        if (success) {
          SoundPlayer.play();
          this.getInfo();
          this.timer = setInterval(() => {
            this.tick();
          }, 1000);
          // this.setState({ timer });
        }
      },
    );

    song = this.props.songlistData && this.props.songlistData[this.state.index];
    try {
      SoundPlayer.loadUrl(song.previewUrl);
    } catch (e) {}
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this._onFinishedPlayingSubscription.remove();
    this._onFinishedLoadingURLSubscription.remove();
  }

  render() {
    const {isPause, index} = this.state;
    const {songlistData} = this.props;
    const item = (songlistData && songlistData[index]) || {};

    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageOuterView}>
          <TouchableOpacity
            onPress={this.navigateToPreviousScreen}
            style={styles.backArrow}>
            <Image
              style={styles.backImg}
              source={require('../../assets/back.png')}
            />
          </TouchableOpacity>
          {item.artworkUrl100 && (
            <Image source={{uri: item.artworkUrl100}} style={styles.img} />
          )}
        </View>

        <View style={styles.playbackContainer}>
          <Text
            style={
              styles.titleTrack
            }>{`${item.trackName} - ${item.collectionName}`}</Text>
          <SeekBar
            style={styles.seekbar}
            onSeek={this.onseek.bind(this)}
            onSlidingStart={() => this.setState({isPause: true})}
            trackLength={this.state.totalLen}
            currentPosition={this.state.currentPos}
          />
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              disabled={index === 0}
              onPress={this.prevTrack}
              style={[styles.prevNext, index === 0 && styles.disabled]}>
              <Image
                style={styles.icon}
                source={require('../../assets/previous.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.playToggle}
              disabled={this.state.endReached}
              style={[
                styles.playPause,
                {paddingLeft: isPause ? 5 : 0},
                this.state.endReached && styles.disabled,
              ]}>
              <Image
                style={styles.icon}
                source={
                  isPause
                    ? require('../../assets/play.png')
                    : require('../../assets/hold.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={index === songlistData.length - 1}
              onPress={this.nextTrack}
              style={[
                styles.prevNext,
                index === songlistData.length - 1 && styles.disabled,
              ]}>
              <Image
                style={styles.icon}
                source={require('../../assets/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songlistData: state.songlistData,
  };
};

export default connect(mapStateToProps)(SongDetailScreen);
