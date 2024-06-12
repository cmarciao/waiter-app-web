import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { Toaster } from 'react-hot-toast';

import '../styles/global.css';

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '600','900']
});

export const metadata: Metadata = {
	title: 'Waiter App',
	description: 'Dedicated page for restaurant orders control.',
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en" className='text-gray-500'>
			<body className={dmSans.className}>
				{children}

				<Toaster
					position="top-right"
					reverseOrder={false}
				/>
			</body>
		</html>
	);
}
