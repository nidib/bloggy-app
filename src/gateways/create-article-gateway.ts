import { bloggyApi, getBloggyApiErrorMessage, makePrivateResourceHeaders } from './_bloggy-api';

type CreateArticleRequestBody = {
	title: string;
	content: string;
};

type CreateArticleResponse = {
	id: string;
	title: string;
	content: string;
};

export async function createArticleGateway(token: string, article: CreateArticleRequestBody) {
	try {
		const { data } = await bloggyApi.post<CreateArticleResponse>('/posts', article, {
			headers: makePrivateResourceHeaders(token),
		});

		return data;
	} catch (e) {
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
