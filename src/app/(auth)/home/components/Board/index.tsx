'use client';

import { Order } from '@/types/Order';
import { RefreshDayModal } from '../RefreshDayModal';
import { OrdersBoard } from '@/components/OrdersBoard';

import { useBoard } from './useBoard';

type BoardProps = {
	orders: Order[];
};

export function Board({ orders }: BoardProps) {
	const {
		waitingOrders,
		preparingOrders,
		finishedOrders,
		isRefreshDayModalOpen
	} = useBoard(orders);

	return (
		<>
			<OrdersBoard
				icon='🕒'
				title='Waiting'
				quantity={waitingOrders.length}
				orders={waitingOrders}
			/>

			<OrdersBoard
				icon='👨‍🍳'
				title='Preparing'
				quantity={preparingOrders.length}
				orders={preparingOrders}
			/>

			<OrdersBoard
				icon='✅'
				title='Finished'
				quantity={finishedOrders.length}
				orders={finishedOrders}
			/>

			<RefreshDayModal
				isOpen={isRefreshDayModalOpen}
			/>
		</>
	);
}
