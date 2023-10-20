import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import './globals.css';

const inter = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '600']
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
			<body className={inter.className}>{children}</body>
		</html>
	);
}
