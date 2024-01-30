import React from 'react';

import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AuthContextProvider, useAuthContext } from './contexts/auth-context';
import { PrivateRoutes } from './routes/private-routes';
import { PublicRoutes } from './routes/public-routes';
import { default as light } from './theme/light.json';
import { default as mapping } from './theme/mapping.json';

const queryClient = new QueryClient();

export function App() {
	const theme = { ...eva.light, ...light };

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} customMapping={mapping as any} theme={theme}>
				<NavigationContainer>
					<AuthContextProvider>
						<QueryClientProvider client={queryClient}>
							<Routes />
						</QueryClientProvider>
					</AuthContextProvider>
				</NavigationContainer>
			</ApplicationProvider>
		</>
	);
}

function Routes() {
	const { isLoggedIn } = useAuthContext();

	return isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
}
