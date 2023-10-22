'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
	to: string;
	label: string;
	icon: string;
	activedIcon: string;
	alt: string;
}

export function NavLink({ to, icon, activedIcon, alt, label }: NavLinkProps) {
	const pathname = usePathname();
	const isActiveLink = pathname === to;
	const src = !isActiveLink ? icon : activedIcon;

	return (
		<Link href={to} className='flex flex-col items-center pt-6 pb-8'>
			<Image
				src={src}
				alt={alt}
			/>
			<span
				data-active={isActiveLink}
				className='text-gray-400 data-[active=true]:text-brand-red'
			>
				{label}
			</span>
		</Link>
	);
}
