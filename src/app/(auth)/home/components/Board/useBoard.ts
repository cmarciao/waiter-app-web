import { useSearchParams } from 'next/navigation';

import { Order } from '@/types/Order';
import { ORDER_STATES } from '@/constants/order-states';

export function useBoard(orders: Order[]) {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	const waitingOrders = orders.filter((order) => order.orderState === ORDER_STATES.WAITING);
	const preparingOrders = orders.filter((order) => order.orderState === ORDER_STATES.PREPARING);
	const finishedOrders = orders.filter((order) => order.orderState === ORDER_STATES.FINISHED);

	return {
		waitingOrders,
		preparingOrders,
		finishedOrders,
		isRefreshDayModalOpen: openedModal === 'refresh'
	};
}
