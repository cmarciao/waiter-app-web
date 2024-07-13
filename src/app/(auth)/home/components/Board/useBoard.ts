import { useSearchParams } from 'next/navigation';

import { Order } from '@/types/Order';
import { ORDER_STATES } from '@/constants/order-states';
import { useCallback, useEffect, useState } from 'react';
import { useWebsocket } from '@/hooks/useWebsocket';
import { getOrders } from '../../actions';

export function useBoard() {
	const [orders, setOrders] = useState<Order[]>([]);
	const { subscribe, unsubscribe } = useWebsocket();

	const loadOrders = useCallback(async () => {
		const orders = await getOrders();
		setOrders(orders);
	}, []);

	useEffect(() => {
		loadOrders();
	}, []);

	useEffect(() => {
		subscribe('orders@new', () => {
			loadOrders();
		});
		
		subscribe('orders@update', () => {
			loadOrders();
		});

		return () => {
			unsubscribe('orders@new');
		};
	}, []);

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
