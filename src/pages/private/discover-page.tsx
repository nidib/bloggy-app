import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Divider, Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ArticleCard } from '../../components/article-card';
import { Header } from '../../components/layouts/header';
import { Page } from '../../components/layouts/page';
import { useAuthContext } from '../../contexts/auth-context';
import { GetPaginatedFiltersRequestParams, getPaginatedArticlesGateway } from '../../gateways/get-paginated-articles';

function useArticles(token: string | null, filters: GetPaginatedFiltersRequestParams) {
	const {
		data: articles = [],
		refetch: refetchArticles,
		isLoading: isLoadingArticles,
	} = useQuery({
		queryKey: ['ARTICLES', token],
		queryFn: () => getPaginatedArticlesGateway(token as string, filters),
		retry: false,
		enabled: Boolean(token),
	});

	return { articles, refetchArticles, isLoadingArticles };
}

export function DiscoverPage() {
	const { token } = useAuthContext();
	const { articles, refetchArticles, isLoadingArticles } = useArticles(token, { order: 'desc', page: 1 });

	return (
		<Page>
			<ScrollView
				refreshControl={
					<RefreshControl
						colors={['black']}
						tintColor={'black'}
						refreshing={isLoadingArticles}
						onRefresh={() => refetchArticles()}
					/>
				}
			>
				<Header
					title="Descubra"
					rightContent={
						<TouchableOpacity hitSlop={10}>
							<Icon name="plus-circle-outline" style={styles.addIcon} />
						</TouchableOpacity>
					}
				/>
				<View style={styles.articleList}>
					<FlashList
						data={articles}
						estimatedItemSize={150}
						renderItem={({ item: article }) => (
							<View key={article.id}>
								<ArticleCard
									id={article.id}
									title={article.title}
									author={article.user}
									createdAt={article.createdAt}
									onCardPress={console.log}
									onAuthorPress={console.log}
								/>
								<Divider style={styles.divider} />
							</View>
						)}
					/>
				</View>
			</ScrollView>
		</Page>
	);
}

const styles = StyleSheet.create({
	headingDivider: {
		marginTop: 20,
	},
	addIcon: { width: 30, height: 30 },
	articleList: {
		minHeight: 150,
	},
	divider: {
		marginVertical: 20,
	},
});
