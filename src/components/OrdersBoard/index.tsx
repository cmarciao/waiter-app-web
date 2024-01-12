import Link from 'next/link';

import { Order } from '@/types/Order';
import { OrdersModal } from '../OrdersModal';

import { useOrdersBoard } from './useOrdersBoard';

type OrdersBoardProps = {
	icon: string;
	title: string;
	quantity: number;
	orders: Order[]
}

export function OrdersBoard({ icon, title, quantity, orders }: OrdersBoardProps) {
	const {
		hasSomeModalOpened
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
					<Link
						key={order.id}
						href={`/home?openedModal=order-details&orderId=${order.id}`}
						className='text-center py-10 bg-white rounded-md border border-gray-200'

					>
						<strong className='font-semibold'>Table {order.table}</strong>
						<span className='block mt-1'>{order.totalProducts} items</span>
					</Link>
				))}
			</section>

			<OrdersModal
				isOpen={hasSomeModalOpened}
			/>
		</section>
	);
}
