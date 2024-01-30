import React from 'react';

import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';

import { LoginPage } from './login/login-page';
import { SignupPage } from './signup/signup-page';

type PublicPagesStack = {
	Login: undefined;
	Signup: undefined;
};

const Stack = createStackNavigator<PublicPagesStack>();

export type PublicPagesStackProps<T extends keyof PublicPagesStack> = StackScreenProps<PublicPagesStack, T>;

export function PublicRoutes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginPage} />
			<Stack.Screen name="Signup" component={SignupPage} />
		</Stack.Navigator>
	);
}
