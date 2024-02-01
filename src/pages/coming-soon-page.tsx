import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@ui-kitten/components';

import { Page } from '../components/layouts/page';

export function ComingSoonPage() {
	return (
		<Page>
			<View style={styles.content}>
				<Text style={styles.message} category="s1" appearance="hint">
					Em breve você poderá salvar seus artigos {'\n'}e vê-los aqui.
				</Text>
			</View>
		</Page>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	message: { textAlign: 'center' },
});
