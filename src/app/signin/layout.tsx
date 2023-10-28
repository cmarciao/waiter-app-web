import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { me } from '@/services/me';

type SignInLayoutProps = {
	children: ReactNode;
}

export default async function SignInLayout({ children }: SignInLayoutProps) {
	const session = await me();

	if(session?.name) {
		redirect('/users');
	}

	return <>{children}</>;
}
