import { ReactNode } from 'react';

type TableActionsProps = {
	children: ReactNode;
}

export function TableActions({ children }: TableActionsProps) {
	return (
		<div className='flex items-center gap-8'>
			{children}
		</div>
	);
}
