import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Controller, useForm } from 'react-hook-form';

import { EyeIndicatorIcon } from '../../../components/icons/eye-indicator-icon';
import { createUserGateway } from '../../../gateways/create-user-gateway';
import { PublicPagesStackProps } from '../../../routes/public-routes';
import { SignupSchema, signupSchema } from './signup-schema';

type Props = PublicPagesStackProps<'Signup'> & {};

export function SignupPage(props: Props) {
	const [shouldHidePassword, setShouldHidePassword] = useState(true);
	const { handleSubmit, control } = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			fullName: 'Richard Bidin',
			username: 'nidib',
			password: 'qwe123',
		},
	});
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

	const signup = ({ fullName, username, password }: SignupSchema) => {
		Keyboard.dismiss();
		createUserGateway({ username, password, fullName })
			.then(console.log)
			.catch(message => {
				Alert.alert('Ops!', message);
			});
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
							<Controller
								name="fullName"
								control={control}
								render={({ field, fieldState }) => (
									<Input
										size="large"
										label="NOME COMPLETO"
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
								name="username"
								control={control}
								render={({ field, fieldState }) => (
									<Input
										size="large"
										label="USERNAME"
										autoCapitalize="none"
										autoCorrect={false}
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
								render={({ field, fieldState }) => (
									<Input
										size="large"
										label="SENHA"
										autoCapitalize="none"
										autoCorrect={false}
										accessoryRight={passwordIconRenderer}
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
								onPress={handleSubmit(signup)}
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
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});
