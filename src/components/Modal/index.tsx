import Link from 'next/link';
import { ReactNode } from 'react';

import { XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import * as Dialog from '@radix-ui/react-dialog';

type ModalProps = Dialog.DialogProps & {
	className?: string;
	children: ReactNode;
	hrefModalClose?: string;
	onCloseModal?: () => void;
}

export function Modal({ className, children, hrefModalClose = '', ...rest }: ModalProps) {
	return (
		<Dialog.Root {...rest} >
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50" />
				<Dialog.Content className={twMerge(
					'z-50 bg-white rounded-md max-w-md w-full p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
					className
				)}>
					<Dialog.Close asChild className='absolute right-6 top-9'>
						<Link href={hrefModalClose}>
							<XIcon />
						</Link>
					</Dialog.Close>

					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
