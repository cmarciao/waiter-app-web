import { Order } from '@/types/Order';
import { Modal } from '../Modal';
import { ModalTitle } from '../Modal/ModalTitle';
import Image from 'next/image';
import { formatPrice } from '@/utils/format-utils';
import { Button } from '../Button';
import { ORDER_STATES } from '@/constants/order-states';
import { useOrdersModal } from './useOrdersModal';

type OrdersModalProps = {
	isOpen: boolean;
	selectedOrder: Order;
	onCloseModal: () => void;
}

export function OrdersModal({ isOpen, selectedOrder, onCloseModal }: OrdersModalProps) {
	if(!isOpen) return;

	const {
		isUpdatingOrderStatus,
		handleChangeOrderStatus
	} = useOrdersModal(selectedOrder, onCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Table {selectedOrder.table}</ModalTitle>

			<section className='flex flex-col gap-2 mt-8'>
				<span className='text-small' >Order status</span>
				<strong>
					{selectedOrder.orderState === ORDER_STATES.WAITING && '🕒 Waiting'}
					{selectedOrder.orderState === ORDER_STATES.PREPARING && '👨‍🍳 Preparing'}
					{selectedOrder.orderState === ORDER_STATES.FINISHED && '✅ Finished'}
				</strong>
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

				<footer className='flex items-center justify-between mt-8'>
					{selectedOrder.orderState !== ORDER_STATES.FINISHED && (
						<Button
							variant='secondary'
						>
						Cancel order
						</Button>
					)}

					{selectedOrder.orderState === ORDER_STATES.WAITING && (
						<Button isLoading={isUpdatingOrderStatus} onClick={handleChangeOrderStatus}>
							👨‍🍳 Start order
						</Button>
					)}

					{selectedOrder.orderState === ORDER_STATES.PREPARING && (
						<Button isLoading={isUpdatingOrderStatus} onClick={handleChangeOrderStatus}>
							✅ Finish order
						</Button>
					)}
				</footer>
			</section>
		</Modal>
	);
}
