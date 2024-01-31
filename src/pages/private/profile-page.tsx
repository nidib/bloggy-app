import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { Icon, Text } from '@ui-kitten/components';

import { Header } from '../../components/layouts/header';
import { Page } from '../../components/layouts/page';
import { useAuthContext } from '../../contexts/auth-context';
import { getUserInfoGateway } from '../../gateways/get-user-info-gateway';

function useUserInfo(token: string | null) {
	const { data: userInfo } = useQuery({
		queryKey: ['USER_INFO', token],
		queryFn: () => getUserInfoGateway(token as string),
		retry: false,
		enabled: Boolean(token),
	});

	return { userInfo } as const;
}

export function ProfilePage() {
	const { logout } = useAuthContext();
	const { token } = useAuthContext();
	const { userInfo } = useUserInfo(token);

	const handleLogout = async () => {
		await logout();
	};

	return (
		<Page>
			<Header
				title="Conta"
				rightContent={
					<TouchableOpacity
						hitSlop={10}
						onPress={() =>
							Alert.alert(
								'Tem certeza que deseja sair?',
								'Se confirmar, terá que fazer login novamente para acessar',
								[
									{ text: 'Sim', isPreferred: true, onPress: handleLogout },
									{ text: 'Cancelar', isPreferred: false },
								]
							)
						}
					>
						<Icon name="log-out-outline" style={styles.logoutIcon} />
					</TouchableOpacity>
				}
			/>
			{userInfo && (
				<View style={styles.spaceBetween}>
					<View style={styles.info}>
						<Text category="h6">
							Nome completo: <Text category="s1">{userInfo.fullName}</Text>
						</Text>
					</View>
				</View>
			)}
		</Page>
	);
}

const styles = StyleSheet.create({
	spaceBetween: {
		flex: 1,
		justifyContent: 'space-between',
	},
	logoutIcon: {
		width: 30,
		height: 30,
	},
	info: {
		gap: 10,
	},
});
