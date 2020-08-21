import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './ListHeaderStyle';

class ListHeader extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textHeader}>MY PLAYLIST</Text>
			</View>
		);
	}
}

export default ListHeader;
