import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Divider, Text } from '@ui-kitten/components';

type Props = {
	title: string;
	rightContent?: ReactNode;
};

export function Header(props: Props) {
	return (
		<View>
			<View style={styles.headerContent}>
				<Text category="h1">{props.title}</Text>
				{props.rightContent ?? null}
			</View>
			<View style={styles.divider}>
				<Divider />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	divider: {
		marginVertical: 20,
	},
});
