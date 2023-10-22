'use client';

import { ReactNode } from 'react';

import { ReactQueryProvider } from './ReactQueryProvider';
import { NextAuthSessionProvider } from './NextAuthSessionProvider';

type GlobalProvidersProps = {
	children: ReactNode;
}

export function GlobalProviders({ children }: GlobalProvidersProps) {
	return (
		<ReactQueryProvider>
			<NextAuthSessionProvider>
				{children}
			</NextAuthSessionProvider>
		</ReactQueryProvider>
	);
}
