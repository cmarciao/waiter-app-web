import { ReactNode } from 'react';

type TableHeaderProps = {
	title: string;
	amount: number;
	children?: ReactNode;
}

export function TableHeader({ title, amount, children }: TableHeaderProps) {
	return (
		<header className='flex items-center justify-between'>
			<div>
				<span className='font-semibold text-large'>{title}</span>
				<span className='text-medium ml-2 inline-block'>{amount}</span>
			</div>

			{children}
		</header>
	);
}
