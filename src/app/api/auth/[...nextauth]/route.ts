/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authService } from '@/services/authService';

export const authOptions: AuthOptions = {
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
					return {
						name: accessToken
					} as any;
				}

				return null;
			},
		})
	],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token }) {
			session.user = {
				name: token.name,
			};

			return session;
		},
	},
	pages: {
		signIn: '/signin'
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
