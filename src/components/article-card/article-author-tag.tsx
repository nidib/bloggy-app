import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@ui-kitten/components';
import { formatDistanceStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Avatar } from '../layouts/avatar';

const TWO_MINUTES = 1000 * 60 * 2;

type Props = {
	authorFullName: string;
	createdAt: string;
};
export function ArticleAuthorTag(props: Props) {
	const { authorFullName } = props;
	const [now, setNow] = useState(new Date());
	const creationDistance = formatDistanceStrict(now, props.createdAt, { addSuffix: false, locale: ptBR });
	const [authorFirstLetterOfName] = authorFullName.toUpperCase();

	useEffect(() => {
		const timer = setInterval(() => {
			setNow(new Date());
		}, TWO_MINUTES);

		return () => clearInterval(timer);
	}, []);

	return (
		<View style={styles.tag}>
			<Avatar letter={authorFirstLetterOfName} size="small" />
			<View style={styles.details}>
				<Text category="s1" appearance="hint">
					{authorFullName}
				</Text>
				<Text appearance="hint">há {creationDistance}</Text>
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
