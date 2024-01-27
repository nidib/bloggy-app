import React from 'react';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';

import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { PublicPagesStackProps } from '../routes/public-routes';

type Props = PublicPagesStackProps<'Signup'> & {};

export function SignupPage(props: Props) {
	const signup = async () => {
		Keyboard.dismiss();
	};

	const goBack = () => {
		props.navigation.goBack();
	};

	return (
		<Layout>
			<SafeAreaView>
				<View>
					<View style={styles.page}>
						<Text category="h1" style={styles.title}>
							BLOGGY
						</Text>
						<View style={styles.form}>
							<Input size="large" label="NOME COMPLETO" />
							<Input
								size="large"
								label="USERNAME"
								autoCapitalize="none"
								autoCorrect={false}
								returnKeyType="next"
							/>
							<Input
								size="large"
								label="SENHA"
								autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry
							/>
							<Button
								size="large"
								onPress={signup}
								// disabled={authing}
								// accessoryLeft={authing ? LoadingIndicator : undefined}
							>
								CRIAR CONTA
							</Button>
							<Button size="large" appearance="ghost" onPress={goBack}>
								VOLTAR
							</Button>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</Layout>
	);
}

// const LoadingIndicator = () => <Spinner size="tiny" status="control" />;

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
