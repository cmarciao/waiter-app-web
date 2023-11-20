import Image from 'next/image';

import { Product } from '@/types/Product';
import { formatPrice } from '@/utils/format-utils';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ModalDescription } from '@/components/Modal/ModalDescription';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { useRemoveProductModal } from './useRemoveProductModal';

type RemoveUserModalProps = {
	product: Product;
	isOpen: boolean;
	onCloseModal: () => void;
}

export function RemoveProductModal({
	product,
	isOpen,
	onCloseModal,
}: RemoveUserModalProps) {
	if(!isOpen) return;

	const {
		isRemovingProduct,
		handleRemoveProduct
	} = useRemoveProductModal(product, onCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Remove product</ModalTitle>
			<ModalDescription>Are you sure you want to delete this product?</ModalDescription>

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

			<footer className='mt-12 flex items-center justify-between'>
				<Button variant='secondary' onClick={onCloseModal}>
					Keep product
				</Button>

				<Button isLoading={isRemovingProduct} onClick={handleRemoveProduct}>
					Remove product
				</Button>
			</footer>
		</Modal>
	);
}
