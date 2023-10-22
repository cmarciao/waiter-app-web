import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableRootProps = {
	className?: string;
	children: ReactNode;
}

export function TableRoot({ className, children }: TableRootProps) {
	return (
		<div className={twMerge(
			'table-auto',
			className
		)}>
			{children}
		</div>
	);
}
