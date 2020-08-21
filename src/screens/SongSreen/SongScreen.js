import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './SongScreenStyle';
import ListHeader from '../../component/ListHeader/ListHeader';
import {fetchSongList} from '../../redux/action/action';
import SongCard from '../../component/SongCard/SongCard';

class SongScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };
  }

  componentDidMount() {
    this.props.fetchSongList();
  }

  onRefresh = () => {
    this.setState({isFetching: true}, () => {
      this.props.fetchSongList();
      this.setState({isFetching: false});
    });
  };

  renderLoader() {
    return (
      <View style={styles.loaderOuterView}>
        <ActivityIndicator size={'large'} color={'#0065FF'} />
        <Text style={styles.loaderText}>Fetching Songs List...</Text>
      </View>
    );
  }

  navigateToSongDetailScreen = (index) => {
    const {navigation} = this.props;
    navigation.navigate('SongDetail', {index});
  };

  render() {
    const {songlistData, isLoading} = this.props;
    return (
      <SafeAreaView style={styles.MainContainer}>
        <StatusBar backgroundColor={'#0065ff'} />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            <ListHeader />
            <FlatList
              data={songlistData}
              style={styles.listPadding}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <SongCard
                  onPress={() => this.navigateToSongDetailScreen(index)}
                  item={item}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              onRefresh={this.onRefresh}
              refreshing={this.state.isFetching}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songlistData: state.songlistData,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = {
  fetchSongList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongScreen);
