import React from 'react';
import { ReactNode, createContext, useContext, useState } from 'react';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

type AuthAuthContext = {
	isLoggedIn: boolean;
	authing: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<null | AuthAuthContext>(null);

export function AuthContextProvider(props: { children: ReactNode }) {
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = async (_username: string, _password: string) => {
		setLoading(true);
		await sleep(2000);
		setLoading(false);
		setIsLoggedIn(true);
	};

	const logout = async () => {
		setLoading(true);
		await sleep(2000);
		setLoading(false);
		setIsLoggedIn(false);
	};

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
