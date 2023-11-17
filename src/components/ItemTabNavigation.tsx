import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ItemTabNavigationProps = {
	href: string;
	isActive: boolean;
	children: ReactNode;
}

export function ItemTabNavigation({ href, isActive, children }: ItemTabNavigationProps ) {
	return (
		<Link
			data-active={isActive}
			href={`/menu?tab=${href}`}
			className={twMerge(
				'inline-block py-4 w-48 hover:bg-gray-200 rounded-md text-center',
				'data-[active=true]:text-brand-red data-[active=true]:font-bold data-[active=false]:text-gray-400 data-[active=true]:bg-gray-200'
			)}
		>
			{children}
		</Link>
	);
}
