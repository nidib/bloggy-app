import { bloggyApi, getBloggyApiErrorMessage, makePrivateResourceHeaders } from './_bloggy-api';

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

export async function getArticleDetailsGateway(token: string, articleId: string): Promise<Article> {
	try {
		const { data } = await bloggyApi.get<Article>(`/posts/${articleId}`, {
			headers: makePrivateResourceHeaders(token),
		});

		console.log(data);

		return data;
	} catch (e) {
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
