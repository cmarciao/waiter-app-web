import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalTitleProps = {
	children: ReactNode;
	className?: string;
}

export function ModalTitle({ children, className }: ModalTitleProps) {
	return (
		<Dialog.Title className={twMerge(
			'font-black',
			className
		)}>
			{children}
		</Dialog.Title>
	);
}
