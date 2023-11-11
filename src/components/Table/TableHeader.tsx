import { ReactNode } from 'react';

type TableHeaderProps = {
	title: string;
	amount: number;
	children?: ReactNode;
}

export function TableHeader({ title, amount, children }: TableHeaderProps) {
	return (
		<header className='flex items-center justify-between'>
			<span className='font-semibold text-large'>
				{title} <span className='font-normal text-medium'>{amount}</span>
			</span>

			{children}
		</header>
	);
}
