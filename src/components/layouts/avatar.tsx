import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@ui-kitten/components';

type Props = {
	letter: string;
	size?: 'small' | 'medium';
};

export function Avatar(props: Props) {
	const size = props.size ?? 'medium';
	const sizeStyles = {
		...styles[size],
	};
	const categoryBySize = {
		small: 'h6',
		medium: 'h5',
	};

	return (
		<View style={[styles.avatar, sizeStyles]}>
			<Text category={categoryBySize[size]} style={styles.avatarLetter}>
				{props.letter}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 20,
		backgroundColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarLetter: {
		color: 'gray',
	},
	small: {
		width: 35,
		height: 35,
	},
	medium: { width: 40, height: 40 },
});
