import React from 'react';

import { StackNavigationOptions, StackScreenProps, createStackNavigator } from '@react-navigation/stack';

import { HomeTabs } from './home-tabs';

type PrivatePagesStack = {
	Home: undefined;
};

const Stack = createStackNavigator<PrivatePagesStack>();

const options: StackNavigationOptions = { headerShown: false };

export type PrivatePagesStackProps<T extends keyof PrivatePagesStack> = StackScreenProps<PrivatePagesStack, T>;

export function PrivateRoutes() {
	return (
		<Stack.Navigator screenOptions={options}>
			<Stack.Screen name="Home" component={HomeTabs} />
		</Stack.Navigator>
	);
}
