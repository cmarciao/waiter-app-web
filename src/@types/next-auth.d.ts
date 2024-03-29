// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
		name?: string | null;
		accessToken?: string | null;
		refreshToken?: string | null;
    }
}

interface User {
	accessToken?: string | null;
	refreshToken?: string | null;
  }
}
