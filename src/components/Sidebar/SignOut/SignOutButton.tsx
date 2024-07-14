'use client';

import Link from 'next/link';
import { PowerIcon } from 'lucide-react';

import { SignOutModal } from './SignOutModal';
import { useSignOut } from './useSignOut';

export function SignOutButton() {
	const {
		pathname,
		isLoggingOut,
		isLogoutModalOpened,
		logout,
		backToPreviousPage
	} = useSignOut();

	return (
		<>
			<Link href={`${pathname}?openedModal=logout`}>
				<button
					className='w-full flex flex-col items-center pt-6 pb-8'
				>
					<PowerIcon />
					<span className='text-gray-400'>
						Sair
					</span>
				</button>
			</Link>

			<SignOutModal
				isOpen={isLogoutModalOpened}
				pathname={pathname}
				isLoggingOut={isLoggingOut}
				onLogout={logout}
				onClose={backToPreviousPage}
			/>
		</>
	);
}
