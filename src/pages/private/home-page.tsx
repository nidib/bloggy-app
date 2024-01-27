import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Layout, Spinner } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthContext } from '../../contexts/auth-context';

export function HomePage() {
	const { authing, logout } = useAuthContext();

	const handleLogout = async () => {
		await logout();
	};
	return (
		<Layout>
			<SafeAreaView>
				<View style={styles.page}>
					<Button
						size="large"
						onPress={handleLogout}
						disabled={authing}
						accessoryLeft={authing ? LoadingIndicator : undefined}
					>
						LOGOUT
					</Button>
				</View>
			</SafeAreaView>
		</Layout>
	);
}

const LoadingIndicator = () => <Spinner size="tiny" status="control" />;

const styles = StyleSheet.create({
	page: {
		height: '100%',
		width: '100%',
		paddingHorizontal: 40,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
