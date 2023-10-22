import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

import { Sidebar } from '@/components/Sidebar';

type AuthLayoutProps = {
	children : ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const session = await getServerSession(authOptions);

	if(!session) {
		redirect('/signin');
	}

	return (
		<>
			<Sidebar />

			<section className='flex-1 ml-[108px] min-h-screen bg-gray-100'>
				{children}
			</section>
		</>
	);
}
