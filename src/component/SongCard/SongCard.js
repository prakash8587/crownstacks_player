import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './SongCradStyle';

const SongCard = (props) => {
	const { item = {} } = props;
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={styles.maincontainer}>
				{item.artworkUrl60 && (
					<Image
						style={styles.image}
						source={{
							uri: item.artworkUrl60
						}}
					/>
				)}
				<View style={styles.titleView}>
					<Text style={styles.trackTitleText}>
						{item.trackName} - {item.artistName}
					</Text>
					<Text style={styles.artistNameText}>{item.collectionName}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default SongCard;
