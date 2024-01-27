import { API_BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';

const UNCAUGHT_ERROR_MESSAGE = 'Algo deu errado';

// Sometimes a pure constante gets undefined, and making it a function apparently solves that issue
const getApiBaseUrl = () => API_BASE_URL;

export const bloggyApi = axios.create({
	baseURL: getApiBaseUrl(),
});

export function getBloggyApiErrorMessage(e: any): null | string {
	if (e instanceof AxiosError) {
		const message = e.response?.data.message;

		if (message && typeof message === 'string') {
			return message;
		}
	}

	return UNCAUGHT_ERROR_MESSAGE;
}
