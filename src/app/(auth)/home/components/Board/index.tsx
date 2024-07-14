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
				title='Fila de espera'
				quantity={waitingOrders.length}
				orders={waitingOrders}
			/>

			<OrdersBoard
				icon='👨‍🍳'
				title='Em produção'
				quantity={preparingOrders.length}
				orders={preparingOrders}
			/>

			<OrdersBoard
				icon='✅'
				title='Pronto'
				quantity={finishedOrders.length}
				orders={finishedOrders}
			/>

			<RefreshDayModal
				isOpen={isRefreshDayModalOpen}
			/>
		</>
	);
}
