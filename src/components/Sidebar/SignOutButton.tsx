'use client';

import { signOut } from 'next-auth/react';
import { PowerIcon } from 'lucide-react';

export function SignOutButton() {
	return (
		<button
			className='w-full flex flex-col items-center pt-6 pb-8'
			onClick={() => signOut()}
		>
			<PowerIcon />
			<span
				className='text-gray-400'
			>
				Exit
			</span>
		</button>
	);
}
