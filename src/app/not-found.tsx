import Link from 'next/link';

import { twMerge } from 'tailwind-merge';
import { ShieldAlertIcon } from 'lucide-react';
import { getAccessToken } from '@/utils/user-credentials';

export default async function NotFound() {
	const accessToken = await getAccessToken();
	const isLogged = !!accessToken;

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='flex items-center flex-col gap-8'>
				<div className='flex flex-col items-center'>
					<ShieldAlertIcon size={134} />

					<h1 className='mt-4'>404</h1>
					<h2>Page not found</h2>
				</div>

				<Link
					href={isLogged ? '/home' : '/signin'}
					className={twMerge(
						'px-7 py-3 text-white bg-brand-red',
						'hover:brightness-90 transition-all',
						'h-full font-semibold rounded-md',
					)}
				>
					{isLogged && 'Go to home'}
					{!isLogged && 'Go to login'}
				</Link>
			</div>
		</div>
	);
}
