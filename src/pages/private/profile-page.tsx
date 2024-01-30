import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { Button, Layout, Spinner, Text } from '@ui-kitten/components';

import { useAuthContext } from '../../contexts/auth-context';
import { getUserInfoGateway } from '../../gateways/get-user-info-gateway';
import { useStorage } from '../../utils/hooks/use-storage';

function useUserInfo(token: string | null) {
	const { data, isPending } = useQuery({
		queryKey: ['USER_INFO', token],
		queryFn: () => getUserInfoGateway(token as string),
		retry: false,
		enabled: Boolean(token),
	});

	return { data, isPending } as const;
}

export function ProfilePage() {
	const { logout } = useAuthContext();
	const [token] = useStorage('BLOGGY_API_TOKEN', null);
	const { data, isPending } = useUserInfo(token);

	const handleLogout = async () => {
		await logout();
	};

	return (
		<Layout>
			<SafeAreaView>
				<View style={styles.page}>
					{isPending ? (
						<View style={styles.spinner}>
							<Spinner />
						</View>
					) : (
						<>
							<Text category="h1">{data?.fullName}</Text>
							<Button size="large" onPress={handleLogout}>
								SAIR
							</Button>
						</>
					)}
				</View>
			</SafeAreaView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	page: {
		height: '100%',
		width: '100%',
		paddingHorizontal: 40,
		paddingVertical: 40,
		justifyContent: 'space-between',
	},
	spinner: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
	},
});
