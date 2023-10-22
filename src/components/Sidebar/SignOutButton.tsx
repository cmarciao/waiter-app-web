'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';

import exitImage from 'public/images/exit.svg';

export function SignOutButton() {
	return (
		<button
			className='w-full flex flex-col items-center pt-6 pb-8'
			onClick={() => signOut()}
		>
			<Image
				src={exitImage}
				alt={'Exit'}
			/>
			<span
				className='text-gray-400'
			>
				Exit
			</span>
		</button>
	);
}
