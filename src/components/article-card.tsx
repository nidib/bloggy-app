import React from 'react';
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
	onAuthorPress: (authorId: string) => void;
	onBookmarkPress: () => void;
};

export function ArticleCard(props: Props) {
	const creationDistance = formatDistanceStrict(props.createdAt, new Date(), { addSuffix: true, locale: ptBR });

	return (
		<TouchableOpacity style={styles.card} onPress={() => props.onCardPress(props.id)}>
			<View style={styles.topRow}>
				<Text category="h5" style={styles.title}>
					{props.title}
				</Text>
				<Icon name="chevron-right-outline" style={styles.chevron} />
			</View>
			<View style={styles.bottomRow}>
				<TouchableOpacity style={styles.info} onPress={() => props.onAuthorPress(props.author.id)}>
					<Avatar letter={props.author.fullName[0]} size="small" />
					<View style={styles.details}>
						<Text category="s1" appearance="hint">
							{props.author.fullName}
						</Text>
						<Text appearance="hint">{creationDistance}</Text>
					</View>
				</TouchableOpacity>
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
