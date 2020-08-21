import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
	MainContainer: {
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#FFF'
	},
	listPadding: { height: 120, backgroundColor: '#000', padding: 14 },
	seperator: {
		height: 0.5,
		backgroundColor: '#E8E8E8',
		marginTop: 10,
		marginBottom: 10
	},
	loaderOuterView: {
		height: 200,
		width: 200,
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderRadius: 8,
		alignSelf: 'center',
		justifyContent: 'center'
	},
	loaderText: { alignSelf: 'center', marginTop: 30, fontSize: 16 }
});
