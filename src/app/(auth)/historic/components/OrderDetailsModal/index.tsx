import Image from 'next/image';

import { formatDate, formatPrice } from '@/utils/formatUtils';

import { Order } from '@/entities/Order';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';

type OrderDetailsModalProps = {
	selectedOrder: Order;
	isOpen: boolean;
	handleCloseModal: () => void;
}

export function OrderDetailsModal({ selectedOrder, isOpen, handleCloseModal }: OrderDetailsModalProps) {
	if(!isOpen) return;

	return (
		<Modal open={isOpen} onCloseModal={handleCloseModal} className='pb-12'>
			<ModalTitle>Table {selectedOrder.table}</ModalTitle>

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
			</section>
		</Modal>
	);
}
