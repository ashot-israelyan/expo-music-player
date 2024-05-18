import { useActiveTrack } from 'react-native-track-player';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { defaultStyles } from '@/styles';
import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { MovingText } from '@/components/MovingText';

export const FloatingPlayer = ({ style }: { style: ViewStyle }) => {
	const activeTrack = useActiveTrack();
	const lastActiveTrack = useLastActiveTrack();

	const displayedTrack = activeTrack ?? lastActiveTrack;

	if (!displayedTrack) {
		return null;
	}

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<FastImage
					source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
					style={styles.trackArtWorkImage}
				/>

				<View style={styles.trackTitleContainer}>
					<MovingText
						text={displayedTrack.title!}
						animationThreshold={25}
						style={styles.trackTitle}
					/>
				</View>

				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={25} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtWorkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		marginLeft: 16,
	},
});
