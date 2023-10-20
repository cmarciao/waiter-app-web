import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

import './globals.css';

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '600','900']
});

export const metadata: Metadata = {
	title: 'Waiter',
	description: 'Dedicated page for restaurant orders control.',
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body
				className={twMerge(
					dmSans.className,
					'text-gray-500'
				)}
			>
				{children}
			</body>
		</html>
	);
}
