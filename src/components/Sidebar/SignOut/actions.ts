'use server';

import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';
import { deleteCredentials } from '@/utils/user-credentials';

export async function signOut() {
	deleteCredentials();

	redirect(APP_ROUTES.public.signIn);
}
