import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Toggle } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export function App() {
	const [toggle, setToggle] = useState(false);
	const isDarkMode = useColorScheme() === 'dark';
	const avaTheme = isDarkMode ? eva.dark : eva.light;

	return (
		<ApplicationProvider {...eva} theme={avaTheme}>
			<Layout style={styles.pageContainer}>
				<Toggle checked={toggle} onChange={setToggle}>
					henlo wold
				</Toggle>
			</Layout>
		</ApplicationProvider>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
