import { bloggyApi, getBloggyApiErrorMessage } from './_bloggy-api';

type NewUser = {
	username: string;
	password: string;
	fullName: string;
};

export async function createUserGateway(newUser: NewUser): Promise<void> {
	try {
		const { data } = await bloggyApi.post('/register', newUser);

		return data;
	} catch (e) {
		const message = getBloggyApiErrorMessage(e);

		throw message;
	}
}
