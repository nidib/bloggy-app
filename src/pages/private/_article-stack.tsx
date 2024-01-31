import React from 'react';

import { StackNavigationOptions, StackScreenProps, createStackNavigator } from '@react-navigation/stack';

import { ArticleEditorPage } from './article-editor-page';
import { DiscoverPage } from './discover-page';

type Article = {
	ArticleList: { userId?: string; headerTitle?: string };
	ArticleDetails: { articleId: string };
	ArticleEditor: { articleId?: string } | undefined;
};

const Stack = createStackNavigator<Article>();
const stackNavigationOptions: StackNavigationOptions = { headerShown: false };

export type ArticleStackProps<T extends keyof Article> = StackScreenProps<Article, T>;

type Props = Article['ArticleList'] & {};

export function ArticleStack(props: Props) {
	const { userId, headerTitle } = props;

	return (
		<Stack.Navigator screenOptions={stackNavigationOptions}>
			<Stack.Screen name="ArticleList" component={DiscoverPage} initialParams={{ userId, headerTitle }} />
			<Stack.Screen name="ArticleDetails" component={Noop} />
			<Stack.Screen name="ArticleEditor" component={ArticleEditorPage} />
		</Stack.Navigator>
	);
}

const Noop = () => null;
