import React, { useCallback } from 'react';
import { ReactNode, createContext, useContext, useState } from 'react';

import { loginGateway } from '../gateways/login-gateway';

type AuthAuthContext = {
	isLoggedIn: boolean;
	authing: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<null | AuthAuthContext>(null);

export function AuthContextProvider(props: { children: ReactNode }) {
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState<null | string>(null);
	const isLoggedIn = Boolean(token);

	const login = useCallback(async (username: string, password: string) => {
		setLoading(true);
		return loginGateway({ username, password })
			.then(userToken => {
				console.log(userToken);
				setToken(userToken);
			})
			.catch(e => {
				throw e;
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const logout = useCallback(async () => {
		setToken(null);
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout, authing: loading }}>
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
