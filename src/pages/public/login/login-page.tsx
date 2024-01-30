import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { Controller, useForm } from 'react-hook-form';

import { EyeIndicatorIcon } from '../../../components/icons/eye-indicator-icon';
import { useAuthContext } from '../../../contexts/auth-context';
import { PublicPagesStackProps } from '../public-routes';
import { LoginSchema, loginSchema } from './login-schema';

type Props = PublicPagesStackProps<'Login'> & {};

export function LoginPage(props: Props) {
	const [shouldHidePassword, setShouldHidePassword] = useState(true);
	const { handleSubmit, control } = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: 'nidib',
			password: 'qwe123',
		},
	});
	const { login, authing } = useAuthContext();
	const passwordIconRenderer = useCallback(
		(accessoryProps: any) => (
			<EyeIndicatorIcon
				{...accessoryProps}
				onPress={() => setShouldHidePassword(current => !current)}
				shouldHide={shouldHidePassword}
			/>
		),
		[shouldHidePassword]
	);

	const handleLogin = ({ username, password }: LoginSchema) => {
		Keyboard.dismiss();
		setShouldHidePassword(true);
		login(username, password).catch(message => {
			Alert.alert('Ops!', message);
		});
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
						<Controller
							name="username"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field, fieldState }) => (
								<Input
									size="large"
									textContentType="username"
									label="USERNAME"
									autoCapitalize="none"
									autoCorrect={false}
									disabled={authing}
									status={fieldState.invalid ? 'danger' : 'basic'}
									caption={fieldState.error?.message}
									value={field.value}
									onChangeText={field.onChange}
									onBlur={field.onBlur}
									ref={field.ref}
								/>
							)}
						/>
						<Controller
							name="password"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field, fieldState }) => (
								<Input
									size="large"
									textContentType="password"
									label="SENHA"
									autoCapitalize="none"
									autoCorrect={false}
									accessoryRight={passwordIconRenderer}
									disabled={authing}
									status={fieldState.invalid ? 'danger' : 'basic'}
									caption={fieldState.error?.message}
									value={field.value}
									onChangeText={field.onChange}
									onBlur={field.onBlur}
									ref={field.ref}
									secureTextEntry={shouldHidePassword}
								/>
							)}
						/>
						<Button
							size="large"
							onPress={handleSubmit(handleLogin)}
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
