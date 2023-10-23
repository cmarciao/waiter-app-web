import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import closeIcon from 'public/images/close.svg';
import Image from 'next/image';

type ModalProps = Dialog.DialogProps & {
	onCloseModal: () => void;
	children: ReactNode;
}

export function Modal({ onCloseModal, children, ...rest }: ModalProps) {
	return (
		<Dialog.Root {...rest} >
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50" />
				<Dialog.Content className='z-50 bg-white rounded-md max-w-md w-full p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<Dialog.Close asChild className='absolute right-6 top-9'>
						<button onClick={onCloseModal}>
							<Image
								src={closeIcon}
								alt='Close modal'
							/>
						</button>
					</Dialog.Close>

					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
