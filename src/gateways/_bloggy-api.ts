import axios, { AxiosError } from 'axios';

const UNCAUGHT_ERROR_MESSAGE = 'Algo deu errado';

export const bloggyApi = axios.create({
	baseURL: 'https://bloggy-api.richardbidin.dev/',
});

export function getBloggyApiErrorMessage<T>(e: T): string {
	if (e instanceof AxiosError) {
		const message = e.response?.data.message;

		if (message && typeof message === 'string') {
			return message;
		}
	}

	return UNCAUGHT_ERROR_MESSAGE;
}

export function makePrivateResourceHeaders(token: string) {
	return {
		['Authorization']: `Bearer ${token}`,
	};
}
