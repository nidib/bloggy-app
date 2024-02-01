import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { Divider, Text } from '@ui-kitten/components';

import { ArticleAuthorTag } from '../../components/article-card/article-author-tag';
import { Header } from '../../components/layouts/header';
import { Page } from '../../components/layouts/page';
import { useAuthContext } from '../../contexts/auth-context';
import { getArticleDetailsGateway } from '../../gateways/get-article-details-gateway';
import { ArticleStackProps } from './_article-stack';

function useArticleDetails(token: string | null, articleId: string) {
	const {
		data: article,
		refetch: refetchArticle,
		isLoading: isLoadingArticle,
	} = useQuery({
		queryKey: ['ARTICLE', articleId, token],
		queryFn: () => getArticleDetailsGateway(token as string, articleId),
		retry: false,
		enabled: Boolean(token),
	});

	return { article, refetchArticle, isLoadingArticle };
}

type Props = ArticleStackProps<'ArticleDetails'>;

export function ArticleDetailsPage(props: Props) {
	const { route } = props;
	const { token } = useAuthContext();
	const { article } = useArticleDetails(token, route.params.articleId);
	const formattedContent = useMemo(
		() =>
			article?.content.split('\\n').map(subStr => {
				return (
					<>
						{subStr}
						{'\n'}
					</>
				);
			}),
		[article?.content]
	);

	return (
		<Page>
			<ScrollView>
				{article && (
					<>
						<Header title={article.title} />
						<ArticleAuthorTag authorFullName={article.user.fullName} createdAt={article.createdAt} />
						<Divider />
						<View style={styles.contentContainer}>
							<Text style={styles.content} category="p1">
								{formattedContent}
							</Text>
						</View>
					</>
				)}
			</ScrollView>
		</Page>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		marginTop: 20,
	},
	content: {
		lineHeight: 25,
	},
});
