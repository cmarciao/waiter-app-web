import { Order } from '@/types/Order';
import { useOrdersBoard } from './useOrdersBoard';
import { OrdersModal } from '../OrdersModal';

type OrdersBoardProps = {
	icon: string;
	title: string;
	quantity: number;
	orders: Order[]
}

export function OrdersBoard({ icon, title, quantity, orders }: OrdersBoardProps) {
	const {
		selectedOrder,
		isOpenOrderDetailsModal,
		handleOpenOrderDetailsModal,
		handleCloseOrderDetailsModal
	} = useOrdersBoard();

	return (
		<section className="p-4 rounded-md border border-gray-200">
			<header className="p-2 flex gap-2 justify-center items-center ">
				<span>{icon}</span>
				<strong>{title}</strong>
				<strong>{quantity}</strong>
			</header>

			<section className='mt-6 flex flex-col gap-4'>
				{orders.map((order) => (
					<button
						key={order.id}
						className='flex flex-col items-center justify-center gap-1 py-10 bg-white rounded-md border border-gray-200'
						onClick={() => handleOpenOrderDetailsModal(order)}
					>
						<strong className='font-semibold'>Table {order.table}</strong>
						<span>{order.totalProducts} items</span>
					</button>
				))}
			</section>

			<OrdersModal
				selectedOrder={selectedOrder!}
				isOpen={isOpenOrderDetailsModal}
				onCloseModal={handleCloseOrderDetailsModal}
			/>
		</section>
	);
}
