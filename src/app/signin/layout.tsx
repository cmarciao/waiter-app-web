import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { meService } from '@/services/me';

type SignInLayoutProps = {
	children: ReactNode;
}

export default async function SignInLayout({ children }: SignInLayoutProps) {
	const session = await meService.me();

	if(session?.name) {
		redirect('/users');
	}

	return <>{children}</>;
}
