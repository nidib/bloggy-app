import { bloggyApi, getBloggyApiErrorMessage } from './_bloggy-api';

type Login = {
	username: string;
	password: string;
};

export async function loginGateway(login: Login): Promise<string> {
	try {
		const { data } = await bloggyApi.post('/login', login);

		return data.token as string;
	} catch (e) {
		console.log(e);
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
