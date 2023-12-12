import { ComponentProps, ReactNode } from 'react';
import { Button } from '../Button';
import Link from 'next/link';

type TableHeaderActionProps = ComponentProps<'button'> & {
	href?: string;
	children: ReactNode;
}

export function TableHeaderAction({ href = '', children, ...rest }: TableHeaderActionProps) {
	return (
		<Link href={href}>
			<Button variant='secondary' {...rest}>
				{children}
			</Button>
		</Link>
	);
}
