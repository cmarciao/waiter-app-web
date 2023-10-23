import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

type ModalTitleProps = {
	children: ReactNode;
}

export function ModalTitle({ children }: ModalTitleProps) {
	return (
		<Dialog.Title className='font-black'>
			{children}
		</Dialog.Title>
	);
}
