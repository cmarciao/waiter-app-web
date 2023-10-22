import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableTdProps = {
	className?: string;
	children: ReactNode;
}

export function TableTd({ className, children }: TableTdProps) {
	return (
		<td className={twMerge(
			'first:pl-4',
			className
		)}>
			{children}
		</td>
	);
}
