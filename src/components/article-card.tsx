import React, { PropsWithoutRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon, Text } from '@ui-kitten/components';
import { formatDistanceStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Avatar } from './layouts/avatar';

type Props = {
	id: string;
	title: string;
	author: { fullName: string; id: string };
	createdAt: string;
	onCardPress: (articleId: string) => void;
	onAuthorPress?: (authorId: Props['author']) => void;
};

export function ArticleCard(props: PropsWithoutRef<Props>) {
	const { id, title, author, onCardPress, onAuthorPress } = props;
	const creationDistance = formatDistanceStrict(props.createdAt, new Date(), { addSuffix: true, locale: ptBR });
	const [authorFirstLetterOfName] = author.fullName.toUpperCase();

	const authorInfoContent = (
		<>
			<Avatar letter={authorFirstLetterOfName} size="small" />
			<View style={styles.details}>
				<Text category="s1" appearance="hint">
					{author.fullName}
				</Text>
				<Text appearance="hint">{creationDistance}</Text>
			</View>
		</>
	);

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
					<TouchableOpacity style={styles.info} onPress={() => onAuthorPress(author)}>
						{authorInfoContent}
					</TouchableOpacity>
				) : (
					<View style={styles.info}>{authorInfoContent}</View>
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
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	details: {
		gap: 2,
	},
	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
});
