import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Icon, Layout, useTheme } from '@ui-kitten/components';

import { ProfilePage } from '../pages/private/profile-page';

const options: BottomTabNavigationOptions = {
	headerShown: false,
	tabBarBackground: () => <View style={styles.tabBarBackground} />,
	tabBarShowLabel: false,
	tabBarStyle: {
		height: 90,
	},
};

type HomeTabs = {
	Discover: undefined;
	Bookmarks: undefined;
	Creations: undefined;
	Profile: undefined;
};

const Tab = createBottomTabNavigator<HomeTabs>();

export type BottomTabsProps<T extends keyof HomeTabs> = StackScreenProps<HomeTabs, T>;

export function HomeTabs() {
	return (
		<Layout style={styles.page}>
			<Tab.Navigator screenOptions={options} initialRouteName="Profile">
				<Tab.Screen
					name="Discover"
					component={Noop}
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

function DiscoverTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="compass-outline" focusedIcon="compass" focused={props.focused} />;
}

function BookmarksTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="bookmark-outline" focusedIcon="bookmark" focused={props.focused} />;
}

function CreationsTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="layers-outline" focusedIcon="layers" focused={props.focused} />;
}

function ProfileTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="person-outline" focusedIcon="person" focused={props.focused} />;
}

function TabIcon(props: { icon: string; focusedIcon: string; focused: boolean }) {
	const t = useTheme();
	const fillColor = props.focused ? t['text-primary-color'] : undefined;

	return <Icon name={props.focused ? props.focusedIcon : props.icon} fill={fillColor} style={styles.tabIcon} />;
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
	tabIcon: {
		width: 30,
		height: 30,
	},
});

const Noop = () => null;
