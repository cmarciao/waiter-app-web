'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type NavLinkProps = {
	to: string;
	label: string;
	icon: LucideIcon;
}

export function NavLink({ to, icon: Icon, label }: NavLinkProps) {
	const pathname = usePathname();
	const isActiveLink = to.includes(pathname);
	const colorIcon = isActiveLink ? '#D73035' : '#666666';

	return (
		<Link href={to} className='flex flex-col items-center pt-6 pb-8 gap-2'>
			<Icon color={colorIcon} />

			<span
				data-active={isActiveLink}
				className={twMerge(
					'text-gray-400 data-[active=true]:text-brand-red data-[active=true]:relative',
					'data-[active=true]:after:w-3 data-[active=true]:after:h-[1px] data-[active=true]:after:bg-brand-red data-[active=true]:after:content-[""] data-[active=true]:after:rounded-sm',
					'data-[active=true]:after:absolute data-[active=true]:after:left-1/2 data-[active=true]:after:bottom-0 data-[active=true]:after:-translate-x-1/2'
				)}
			>
				{label}
			</span>
		</Link>
	);
}
