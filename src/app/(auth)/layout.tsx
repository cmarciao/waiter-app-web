import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { Sidebar } from '@/components/Sidebar';
import { me } from '@/services/me';

type AuthLayoutProps = {
	children : ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const session = await me();

	if(!session?.name) {
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
