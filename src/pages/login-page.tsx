import React from 'react';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';

import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';

import { useAuthContext } from '../contexts/auth-context';
import { PublicPagesStackProps } from '../routes/public-routes';

type Props = PublicPagesStackProps<'Login'> & {};

export function LoginPage(props: Props) {
	const { login, authing } = useAuthContext();

	const handleLogin = async () => {
		Keyboard.dismiss();
		await login('', '');
	};

	const goToSignupPage = () => {
		props.navigation.navigate('Signup');
	};

	return (
		<Layout>
			<SafeAreaView>
				<View style={styles.page}>
					<Text category="h1" style={styles.title}>
						BLOGGY
					</Text>
					<View style={styles.form}>
						<Input
							size="large"
							label="USERNAME"
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="next"
							disabled={authing}
						/>
						<Input
							size="large"
							label="SENHA"
							autoCapitalize="none"
							autoCorrect={false}
							disabled={authing}
							secureTextEntry
						/>
						<Button
							size="large"
							onPress={handleLogin}
							disabled={authing}
							accessoryLeft={authing ? LoadingIndicator : undefined}
						>
							LOGIN
						</Button>
						<Button size="large" appearance="ghost" onPress={goToSignupPage} disabled={authing}>
							CRIAR CONTA
						</Button>
					</View>
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
	title: {
		marginTop: 100,
		marginBottom: 50,
	},
	form: {
		gap: 30,
		width: '100%',
	},
});
