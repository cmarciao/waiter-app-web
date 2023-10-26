import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type ModalProps = Dialog.DialogProps & {
	className?: string;
	onCloseModal: () => void;
	children: ReactNode;
}

export function Modal({ className, onCloseModal, children, ...rest }: ModalProps) {
	return (
		<Dialog.Root {...rest} >
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50" />
				<Dialog.Content className={twMerge(
					'z-50 bg-white rounded-md max-w-md w-full p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
					className
				)}>
					<Dialog.Close asChild className='absolute right-6 top-9'>
						<button onClick={onCloseModal}>
							<XIcon />
						</button>
					</Dialog.Close>

					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
