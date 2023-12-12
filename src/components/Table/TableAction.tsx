import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

type TableActionProps = ComponentProps<'button'> & {
	icon: ReactNode;
	hrefAction?: string;
}

export function TableAction({ icon, hrefAction = '',  ...rest }: TableActionProps) {
	return (
		<button {...rest}>
			<Link href={hrefAction}>
				{icon}
			</Link>
		</button>
	);
}
