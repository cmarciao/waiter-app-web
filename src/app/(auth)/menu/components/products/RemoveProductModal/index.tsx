import Image from 'next/image';
import { useFormStatus } from 'react-dom';

import { LoadScreen } from '@/components';
import { Button } from '@/components/Button';
import { Modal, ModalTitle, ModalDescription } from '@/components';

import { useRemoveProductModal } from './useRemoveProductModal';
import { formatPrice } from '@/utils/format-utils';
import Link from 'next/link';

type RemoveUserModalProps = {
	isOpen: boolean;
}

function ActionsButtons() {
	const { pending } = useFormStatus();

	return (
		<footer className='mt-12 flex items-center justify-between'>
			<Link href='/menu?tab=products'>
				<Button
					type='button'
					variant='secondary'
				>
					Cancelar
				</Button>
			</Link>

			<Button
				type='submit'
				isLoading={pending}
			>
				Excluir produto
			</Button>
		</footer>
	);
}

export function RemoveProductModal({ isOpen }: RemoveUserModalProps) {
	if(!isOpen) return;

	const {
		product,
		formAction
	} = useRemoveProductModal();

	if(!product) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=products'>
			<form action={formAction}>
				<ModalTitle>Excluir produto</ModalTitle>
				<ModalDescription>Tem certeza que deseja excluir o produto?</ModalDescription>

				<section className='mt-6 flex justify-center h-[123px]'>
					<Image
						className='rounded-md'
						width={158}
						height={123}
						src={product.imageUrl}
						alt={product.name}
					/>

					<div className='min-w-fit flex flex-col ml-4 gap-3 justify-center'>
						<span>{product.category.emoji} {product.category.name}</span>
						<strong>{product.name}</strong>
						<span>{formatPrice(product.price)}</span>
					</div>
				</section>

				<ActionsButtons />
			</form>
		</Modal>
	);
}
