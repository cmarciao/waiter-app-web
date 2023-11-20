import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';

type AuthLayoutProps = {
	children : ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<>
			<Sidebar />

			<section className='flex-1 ml-[108px] min-h-screen bg-gray-100'>
				{children}
			</section>
		</>
	);
}
