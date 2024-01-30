import { bloggyApi, getBloggyApiErrorMessage, makePrivateResourceHeaders } from './_bloggy-api';

type GetUserInfoResponse = {
	id: string;
	fullName: string;
	createdAt: string;
	updatedAt: string;
};

export async function getUserInfoGateway(token: string) {
	try {
		const { data } = await bloggyApi.get<GetUserInfoResponse>('/user', {
			headers: makePrivateResourceHeaders(token),
		});

		return data;
	} catch (e) {
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
