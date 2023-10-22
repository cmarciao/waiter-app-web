/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authService } from '@/services/authService';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials) {
				const params = {
					email: credentials?.email || '',
					password: credentials?.password || ''
				};

				const { accessToken } = await authService.signIn(params);

				if(accessToken) {
					return accessToken as any;
				}

				return null;
			},
		})
	],
	pages: {
		signIn: '/signin'
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
