/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import AuthService from '@/services/AuthService';

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

				const reponse = await AuthService.signIn(params);

				if(reponse?.error) {
					throw new Error(reponse.message);
				}

				return {
					name: reponse.accessToken,
					accessToken: reponse.accessToken,
					refreshToken: reponse.refreshToken,
				} as any;

			},
		})
	],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if(user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
			}

			return token;
		},
		async session({ session, token }) {
			session.user = {
				accessToken: token.accessToken,
				refreshToken: token.refreshToken
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
