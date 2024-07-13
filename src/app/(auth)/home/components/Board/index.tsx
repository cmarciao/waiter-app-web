'use client';

import { RefreshDayModal } from '../RefreshDayModal';
import { OrdersBoard } from '@/components/OrdersBoard';

import { useBoard } from './useBoard';

export function Board() {
	const {
		waitingOrders,
		preparingOrders,
		finishedOrders,
		isRefreshDayModalOpen
	} = useBoard();

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
