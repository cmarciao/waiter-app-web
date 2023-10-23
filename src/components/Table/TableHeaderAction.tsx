import { ComponentProps, ReactNode } from 'react';
import { Button } from '../Button';

type TableHeaderActionProps = ComponentProps<'button'> & {
	children: ReactNode;
}

export function TableHeaderAction({ children, ...rest }: TableHeaderActionProps) {
	return (
		<Button variant='secondary' {...rest}>
			{children}
		</Button>
	);
}
