import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions, StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { BookmarksTabIcon, CreationsTabIcon, DiscoverTabIcon, ProfileTabIcon } from '../../components/icons/tabs-icons';
import { DiscoverPage } from './discover-page';
import { ProfilePage } from './profile-page';

type PrivatePagesStack = {
	Home: undefined;
};

const Stack = createStackNavigator<PrivatePagesStack>();

const stackNavigationOptions: StackNavigationOptions = { headerShown: false };

export type PrivatePagesStackProps<T extends keyof PrivatePagesStack> = StackScreenProps<PrivatePagesStack, T>;

export function PrivateRoutes() {
	return (
		<Stack.Navigator screenOptions={stackNavigationOptions}>
			<Stack.Screen name="Home" component={PrivateTabs} />
		</Stack.Navigator>
	);
}

const bottomTabNavigationOptions: BottomTabNavigationOptions = {
	headerShown: false,
	tabBarBackground: () => <View style={styles.tabBarBackground} />,
	tabBarShowLabel: false,
	tabBarStyle: {
		height: 90,
	},
};

type PrivateTabs = {
	Discover: undefined;
	Bookmarks: undefined;
	Creations: undefined;
	Profile: undefined;
};

const Tab = createBottomTabNavigator<PrivateTabs>();

export type PrivateTabsProps<T extends keyof PrivateTabs> = StackScreenProps<PrivateTabs, T>;

function PrivateTabs() {
	return (
		<Layout style={styles.page}>
			<Tab.Navigator screenOptions={bottomTabNavigationOptions} initialRouteName="Discover">
				<Tab.Screen
					name="Discover"
					component={DiscoverPage}
					options={{
						tabBarIcon: DiscoverTabIcon,
					}}
				/>
				<Tab.Screen
					name="Bookmarks"
					component={Noop}
					options={{
						tabBarIcon: BookmarksTabIcon,
					}}
				/>
				<Tab.Screen
					name="Creations"
					component={Noop}
					options={{
						tabBarIcon: CreationsTabIcon,
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfilePage}
					options={{
						tabBarIcon: ProfileTabIcon,
					}}
				/>
			</Tab.Navigator>
		</Layout>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	tabBarBackground: {
		flex: 1,
		borderTopWidth: 1,
		borderColor: 'darkgrey',
	},
});

const Noop = () => null;
