import React, { useCallback } from 'react';
import { ReactNode, createContext, useContext, useState } from 'react';

import { loginGateway } from '../gateways/login-gateway';
import { StorageKeyEnum } from '../utils/hooks/storage';
import { useStorage } from '../utils/hooks/use-storage';

type AuthAuthContext = {
	isLoggedIn: boolean;
	authing: boolean;
	token: string | null;
	userId: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<null | AuthAuthContext>(null);

export function AuthContextProvider(props: { children: ReactNode }) {
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useStorage<string | null>(StorageKeyEnum.BLOGGY_API_TOKEN, null);
	const [userId, setUserId] = useStorage<string | null>(StorageKeyEnum.LOGGED_USER_ID, null);
	const isLoggedIn = Boolean(token && !loading);

	const login = useCallback(
		async (username: string, password: string) => {
			setLoading(true);
			return loginGateway({ username, password })
				.then(data => {
					setToken(data.token);
					setUserId(data.userId);
				})
				.catch(e => {
					throw e;
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[setToken, setUserId]
	);

	const logout = useCallback(async () => {
		setToken(null);
		setUserId(null);
	}, [setToken, setUserId]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout, token, userId, authing: loading }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const ctx = useContext(AuthContext);

	if (!ctx) {
		throw new Error('To use this hook, it needs to be under the AuthProvider');
	}

	return ctx;
}
