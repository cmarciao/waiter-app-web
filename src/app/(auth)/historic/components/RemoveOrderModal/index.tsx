import Image from 'next/image';

import { Order } from '@/types/Order';
import { formatDate, formatPrice } from '@/utils/format-utils';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { ModalDescription } from '@/components/Modal/ModalDescription';

import { useRemoveOrderModal } from './useRemoveOrderModal';

type RemoveOrderModalProps = {
	selectedOrder: Order;
	isOpen: boolean;
	handleCloseModal: () => void;
}

export function RemoveOrderModalModal({ selectedOrder, isOpen, handleCloseModal }: RemoveOrderModalProps) {
	if(!isOpen) return;

	const {
		isRemovingHistoricOrder,
		handleRemoveHistoricOrder
	} = useRemoveOrderModal(selectedOrder, handleCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={handleCloseModal}>
			<ModalTitle>Remove order</ModalTitle>
			<ModalDescription>Are you sure you want to remove this order?</ModalDescription>

			<section className='flex flex-col gap-2 mt-8'>
				<span className='text-small' >Table</span>
				<strong>{selectedOrder.table}</strong>
			</section>

			<section className='flex flex-col gap-2 mt-8'>
				<span className='text-small' >Order date</span>
				<strong>{formatDate(new Date(selectedOrder.createdAt))}</strong>
			</section>

			<section className='mt-8'>
				<span className='text-small'>Items</span>
				<section className='flex flex-col gap-4 mt-4'>
					{selectedOrder.products.map((product) => (
						<div key={product.id} className='flex gap-3'>
							<Image
								className='rounded-md'
								width={56}
								height={48}
								src={product.imageUrl}
								alt={product.name}
								style={{
									width: 56,
									height: 48
								}}
							/>

							<span className='text-gray-300'>{product.count}x</span>

							<div className='flex flex-col'>
								<strong>{product.name}</strong>
								<span>{formatPrice(product.price)}</span>
							</div>
						</div>
					))}
				</section>

				<div className='mt-6 flex justify-between items-center'>
					<span className='text-small'>Total</span>
					<strong>{formatPrice(selectedOrder.total)}</strong>
				</div>

				<Button
					className='mt-8'
					variant='secondary'
					onClick={handleRemoveHistoricOrder}
					isLoading={isRemovingHistoricOrder}
				>
					Delete order
				</Button>
			</section>
		</Modal>
	);
}
