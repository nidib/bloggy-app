import { bloggyApi, getBloggyApiErrorMessage } from './_bloggy-api';

type Login = {
	username: string;
	password: string;
};

export async function loginGateway(login: Login): Promise<{ token: string; userId: string }> {
	try {
		const { data } = await bloggyApi.post('/login', login);

		return {
			token: data.token,
			userId: data.id,
		};
	} catch (e) {
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
