'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type GlobalProvidersProps = {
	children: ReactNode;
}

const queryClient = new QueryClient();

export function GlobalProviders({ children }: GlobalProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
