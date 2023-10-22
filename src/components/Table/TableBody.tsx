import { ReactNode } from 'react';

type TableBodyProps = {
	className?: string;
	children: ReactNode;
}

export function TableBody({ className, children }: TableBodyProps) {
	return (
		<tbody className={className}>
			{children}
		</tbody>
	);
}
