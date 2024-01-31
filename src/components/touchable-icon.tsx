import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Icon, Text } from '@ui-kitten/components';

type Props = {
	icon: string;
	children: string;
	onPress: () => void;
};

export function TouchableIcon(props: Props) {
	const { icon, children, onPress } = props;
	return (
		<TouchableOpacity style={styles.button} hitSlop={10} onPress={onPress}>
			<Icon name={icon} style={styles.icon} />
			<Text category="s1">{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	icon: {
		width: 16,
		height: 16,
	},
});
