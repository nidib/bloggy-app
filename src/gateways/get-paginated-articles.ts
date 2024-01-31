import { bloggyApi, getBloggyApiErrorMessage, makePrivateResourceHeaders } from './_bloggy-api';

export type GetPaginatedFiltersRequestParams = {
	userId?: string;
	order: 'asc' | 'desc';
	page: number;
};

type Article = {
	id: string;
	title: string;
	content: string;
	user: {
		id: string;
		username: string;
		fullName: string;
		didBookmark: boolean;
	};
	createdAt: string;
	updatedAt: string;
};

export async function getPaginatedArticlesGateway(token: string, filters: GetPaginatedFiltersRequestParams) {
	try {
		const { data } = await bloggyApi.get<Article[]>('/posts', {
			headers: makePrivateResourceHeaders(token),
			params: {
				order: filters.order,
				page: filters.page,
				user: filters.userId,
			},
		});

		return data;
	} catch (e) {
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
