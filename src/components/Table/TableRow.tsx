import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableRowProps = {
	className?: string;
	children: ReactNode;
}

export function TableRow({ className, children }: TableRowProps) {
	return (
		<tr className={twMerge(
			'h-16',
			className
		)}>
			{children}
		</tr>
	);
}
