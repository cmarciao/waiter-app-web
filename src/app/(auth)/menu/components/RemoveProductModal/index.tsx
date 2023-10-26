import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ModalDescription } from '@/components/Modal/ModalDescription';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Product } from '@/entities/Product';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';

type RemoveUserModalProps = {
	product: Product;
	isOpen: boolean;
	isDeletingProduct: boolean;
	onCloseModal: () => void;
	onRemoveProduct: () => void;
}

export function RemoveProductModal({
	product,
	isOpen,
	isDeletingProduct,
	onCloseModal,
	onRemoveProduct
}: RemoveUserModalProps) {
	if(!isOpen) return;

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Remove product</ModalTitle>
			<ModalDescription>Are you sure you want to delete the product?</ModalDescription>

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

				<Button isLoading={isDeletingProduct} onClick={onRemoveProduct}>
					Remove product
				</Button>
			</footer>
		</Modal>
	);
}
