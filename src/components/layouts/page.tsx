import React from 'react';
import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Layout } from '@ui-kitten/components';

export function Page(props: PropsWithChildren) {
	return (
		<Layout>
			<SafeAreaView>
				<View style={styles.page}>{props.children}</View>
			</SafeAreaView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	page: {
		height: '100%',
		width: '100%',
		paddingHorizontal: 20,
		paddingTop: 30,
	},
});
