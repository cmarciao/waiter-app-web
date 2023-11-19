import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableActionsProps = {
	className?: string;
	children: ReactNode;
}

export function TableActions({ className, children }: TableActionsProps) {
	return (
		<div className={twMerge(
			'flex items-center gap-8',
			className
		)}>
			{children}
		</div>
	);
}
