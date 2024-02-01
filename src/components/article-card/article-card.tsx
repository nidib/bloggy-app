import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon, Text } from '@ui-kitten/components';

import { ArticleAuthorTag } from './article-author-tag';

type Props = {
	id: string;
	title: string;
	author: { fullName: string; id: string };
	createdAt: string;
	onCardPress: (articleId: string) => void;
	onAuthorPress?: (authorId: Props['author']) => void;
};

export function ArticleCard(props: Props) {
	const { id, title, author, createdAt, onCardPress, onAuthorPress } = props;
	const authorInfoContent = <ArticleAuthorTag authorFullName={author.fullName} createdAt={createdAt} />;

	return (
		<TouchableOpacity style={styles.card} onPress={() => onCardPress(id)}>
			<View style={styles.topRow}>
				<Text category="h5" style={styles.title}>
					{title}
				</Text>
				<Icon name="chevron-right-outline" style={styles.chevron} />
			</View>
			<View style={styles.bottomRow}>
				{onAuthorPress ? (
					<TouchableOpacity onPress={() => onAuthorPress(author)}>{authorInfoContent}</TouchableOpacity>
				) : (
					<View>{authorInfoContent}</View>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		justifyContent: 'space-between',
		gap: 12,
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		flex: 1,
	},
	chevron: {
		opacity: 0.3,
		width: 40,
		height: 40,
		left: 8,
	},
	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
});
