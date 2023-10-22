import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableHeadProps = {
	className?: string;
	children: ReactNode;
}

export function TableHead({ className, children }: TableHeadProps) {
	return (
		<thead className={twMerge(
			'first:text-left fisrt:font-semibold first:bg-gray-200',
			className
		)}>
			{children}
		</thead>
	);
}
