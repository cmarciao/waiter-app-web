import Image from 'next/image';

import { Button } from '../Button';
import { LoadScreen, Modal, ModalTitle } from '../';

import { formatPrice } from '@/utils/format-utils';
import { ORDER_STATES } from '@/constants/order-states';

import { useOrdersModal } from './useOrdersModal';

type OrdersModalProps = {
	isOpen: boolean;
}

export function OrdersModal({ isOpen }: OrdersModalProps) {
	if(!isOpen) return;

	const {
		order,
		isUpdatingOrder,
		handleChangeOrderStatus,
		handleRemoveOrder
	} = useOrdersModal();

	if(!order) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/home'>
			<ModalTitle>Table {order.table}</ModalTitle>

			<section className='flex flex-col gap-2 mt-8'>
				<span className='text-small' >Order status</span>
				<strong>
					{order.orderState === ORDER_STATES.WAITING && '🕒 Waiting'}
					{order.orderState === ORDER_STATES.PREPARING && '👨‍🍳 Preparing'}
					{order.orderState === ORDER_STATES.FINISHED && '✅ Finished'}
				</strong>
			</section>

			<section className='mt-8'>
				<span className='text-small'>Items</span>
				<section className='flex flex-col gap-4 mt-4'>
					{order.products.map((product) => (
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
					<strong>{formatPrice(order.total)}</strong>
				</div>

				<footer className='flex items-center justify-between mt-8'>
					{order.orderState !== ORDER_STATES.FINISHED && (
						<Button
							variant='secondary'
							onClick={handleRemoveOrder}
							isLoading={isUpdatingOrder}
						>
							Cancel order
						</Button>
					)}

					{order.orderState === ORDER_STATES.WAITING && (
						<Button isLoading={isUpdatingOrder} onClick={handleChangeOrderStatus}>
							👨‍🍳 Start order
						</Button>
					)}

					{order.orderState === ORDER_STATES.PREPARING && (
						<Button isLoading={isUpdatingOrder} onClick={handleChangeOrderStatus}>
							✅ Finish order
						</Button>
					)}
				</footer>
			</section>
		</Modal>
	);
}
