import { ComponentProps, ReactNode } from 'react';

type TableActionProps = ComponentProps<'button'> & {
	icon: ReactNode;
}

export function TableAction({ icon, ...rest }: TableActionProps) {
	return (
		<button {...rest}>
			{icon}
		</button>
	);
}
