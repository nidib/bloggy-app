import React from 'react';
import { StyleSheet } from 'react-native';

import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions, StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { BookmarksTabIcon, CreationsTabIcon, DiscoverTabIcon, ProfileTabIcon } from '../../components/icons/tabs-icons';
import { useAuthContext } from '../../contexts/auth-context';
import { ComingSoonPage } from '../coming-soon-page';
import { ArticleStack } from './_article-stack';
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
	const { userId } = useAuthContext();

	return (
		<Layout style={styles.page}>
			<Tab.Navigator screenOptions={bottomTabNavigationOptions} initialRouteName="Discover">
				<Tab.Screen
					name="Discover"
					options={{
						tabBarIcon: DiscoverTabIcon,
					}}
					component={ArticleStack}
				/>
				<Tab.Screen
					name="Bookmarks"
					component={ComingSoonPage}
					options={{
						tabBarIcon: BookmarksTabIcon,
					}}
				/>
				<Tab.Screen
					name="Creations"
					options={{
						tabBarIcon: CreationsTabIcon,
					}}
				>
					{() => <ArticleStack userId={userId ?? undefined} />}
				</Tab.Screen>
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
});
