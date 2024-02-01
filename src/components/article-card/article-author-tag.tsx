import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@ui-kitten/components';
import { formatDistanceStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Avatar } from '../layouts/avatar';

type Props = {
	authorFullName: string;
	createdAt: string;
};
export function ArticleAuthorTag(props: Props) {
	const { authorFullName } = props;
	const creationDistance = formatDistanceStrict(props.createdAt, new Date(), { addSuffix: true, locale: ptBR });
	const [authorFirstLetterOfName] = authorFullName.toUpperCase();

	return (
		<View style={styles.tag}>
			<Avatar letter={authorFirstLetterOfName} size="small" />
			<View style={styles.details}>
				<Text category="s1" appearance="hint">
					{authorFullName}
				</Text>
				<Text appearance="hint">{creationDistance}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	tag: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		gap: 10,
	},
	details: {
		gap: 2,
	},
});
