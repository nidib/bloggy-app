import React from 'react';

import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';

import { HomePage } from '../pages/private/home-page';

type PrivatePagesStack = {
	Home: undefined;
};

const Stack = createStackNavigator<PrivatePagesStack>();

export type PrivatePagesStackProps<T extends keyof PrivatePagesStack> = StackScreenProps<PrivatePagesStack, T>;

export function PrivateRoutes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
			<Stack.Screen name="Home" component={HomePage} />
		</Stack.Navigator>
	);
}
