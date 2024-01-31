import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Divider } from '@ui-kitten/components';

import { ArticleCard } from '../../components/article-card';
import { Header } from '../../components/layouts/header';
import { Page } from '../../components/layouts/page';
import { TouchableIcon } from '../../components/touchable-icon';
import { useAuthContext } from '../../contexts/auth-context';
import { GetPaginatedFiltersRequestParams, getPaginatedArticlesGateway } from '../../gateways/get-paginated-articles';
import { ArticleStackProps } from './_article-stack';

function useArticles(token: string | null, filters: GetPaginatedFiltersRequestParams) {
	const filterValues = Object.values(filters);
	const {
		data: articles = [],
		refetch: refetchArticles,
		isLoading: isLoadingArticles,
	} = useQuery({
		queryKey: ['ARTICLES', ...filterValues, token],
		queryFn: () => getPaginatedArticlesGateway(token as string, filters),
		retry: false,
		enabled: Boolean(token),
	});

	return { articles, refetchArticles, isLoadingArticles };
}

export function DiscoverPage(props: ArticleStackProps<'ArticleList'>) {
	const { userId: filteredByUser, headerTitle } = props.route.params ?? {};
	const { token, userId } = useAuthContext();
	const { articles, refetchArticles, isLoadingArticles } = useArticles(token, {
		userId: filteredByUser,
		order: 'desc',
		page: 1,
	});
	const isFilteringByTheLoggedUserId = filteredByUser === userId;
	const pageTitle = useMemo(() => {
		if (headerTitle) {
			return headerTitle;
		}

		if (userId === filteredByUser) {
			return 'Seus artigos';
		}

		return 'Descubra';
	}, [filteredByUser, headerTitle, userId]);

	useFocusEffect(
		React.useCallback(() => {
			refetchArticles();
		}, [refetchArticles])
	);

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
					title={pageTitle}
					rightContent={
						!isFilteringByTheLoggedUserId && (
							<TouchableIcon
								icon="plus-circle-outline"
								onPress={() => props.navigation.push('ArticleEditor')}
							>
								Criar
							</TouchableIcon>
						)
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
									onAuthorPress={
										article.user.id !== filteredByUser
											? pressedUser => {
													props.navigation.push('ArticleList', {
														userId: pressedUser.id,
														headerTitle: pressedUser.fullName,
													});
											  }
											: undefined
									}
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
	articleList: {
		minHeight: 150,
	},
	divider: {
		marginVertical: 20,
	},
});
