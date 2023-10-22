import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableBodyProps = {
	className?: string;
	children: ReactNode;
}

export function TableBody({ className, children }: TableBodyProps) {
	return (
		<tbody className={twMerge(
			'shadow-md rounded-ee-md rounded-es-md',
			className
		)}>
			{children}
		</tbody>
	);
}
