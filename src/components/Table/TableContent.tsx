import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableContentProps = {
	className?: string;
	children: ReactNode;
}

export function TableContent({ className, children }: TableContentProps) {
	return (
		<table className={twMerge('w-full', className)}>
			{children}
		</table>
	);
}
