import { Button } from '../Button';

type TableHeaderProps = {
	title: string;
	amount: number;
}

export function TableHeader({ title, amount }: TableHeaderProps) {
	return (
		<header className='flex items-center justify-between'>
			<span className='font-semibold text-large'>
				{title} <span className='font-normal text-medium'>{amount}</span>
			</span>

			<Button variant='secondary'>
				New user
			</Button>
		</header>
	);
}
