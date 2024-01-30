import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, useTheme } from '@ui-kitten/components';

export function DiscoverTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="compass-outline" focusedIcon="compass" focused={props.focused} />;
}

export function BookmarksTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="bookmark-outline" focusedIcon="bookmark" focused={props.focused} />;
}

export function CreationsTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="layers-outline" focusedIcon="layers" focused={props.focused} />;
}

export function ProfileTabIcon(props: { focused: boolean }) {
	return <TabIcon icon="person-outline" focusedIcon="person" focused={props.focused} />;
}

function TabIcon(props: { icon: string; focusedIcon: string; focused: boolean }) {
	const t = useTheme();
	const fillColor = props.focused ? t['text-primary-color'] : undefined;

	return <Icon name={props.focused ? props.focusedIcon : props.icon} fill={fillColor} style={styles.tabIcon} />;
}

const styles = StyleSheet.create({
	tabIcon: {
		width: 30,
		height: 30,
	},
});
