import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableTHeadProps = {
	className?: string;
	children: ReactNode;
}

export function TableTHead({ className, children }: TableTHeadProps) {
	return (
		<th className={twMerge(
			'py-4',
			'first:rounded-ss-md first:pl-4',
			'last:rounded-se-md last:w-[96px]',
			className
		)}>
			{children}
		</th>
	);
}
