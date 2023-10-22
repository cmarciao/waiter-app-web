import { ReactNode } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

type SignInLayoutProps = {
	children: ReactNode;
}

export default async function SignInLayout({ children }: SignInLayoutProps) {
	const session = await getServerSession(authOptions);

	if(session) {
		redirect('/users');
	}

	return <>{children}</>;
}
