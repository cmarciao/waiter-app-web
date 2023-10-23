import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

type ModalDescriptionProps = {
	children: ReactNode;
}

export function ModalDescription({ children }: ModalDescriptionProps) {
	return (
		<Dialog.Description className='text-center mt-12 font-semibold'>
			{children}
		</Dialog.Description>
	);
}
