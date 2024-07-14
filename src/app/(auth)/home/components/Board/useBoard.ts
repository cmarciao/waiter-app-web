import { useSearchParams } from 'next/navigation';

import { Order } from '@/types/Order';
import { ORDER_STATES } from '@/constants/order-states';
import { useCallback, useEffect, useState } from 'react';
import { useWebsocket } from '@/hooks/useWebsocket';
import { getOrders } from '../../actions';
import toast from 'react-hot-toast';

export function useBoard() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoadingOrders, setIsLoadingOrders] = useState(true);
	const [isLoadOrdersError, setIsLoadOrdersError] = useState(false);
	const { subscribe, unsubscribe } = useWebsocket();

	const loadOrders = useCallback(async () => {
		try {
			const orders = await getOrders();
			setOrders(orders);
			setIsLoadOrdersError(false);
		} catch {
			toast.error('Erro ao listar pedidos.');
			setIsLoadOrdersError(true);
		} finally {
			setIsLoadingOrders(false);
		}
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

	function handleReload() {
		window.location.reload();
	}

	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	const waitingOrders = orders.filter((order) => order.orderState === ORDER_STATES.WAITING);
	const preparingOrders = orders.filter((order) => order.orderState === ORDER_STATES.PREPARING);
	const finishedOrders = orders.filter((order) => order.orderState === ORDER_STATES.FINISHED);

	return {
		handleReload,
		isLoadOrdersError,
		isLoadingOrders,
		waitingOrders,
		preparingOrders,
		finishedOrders,
		isRefreshDayModalOpen: openedModal === 'refresh'
	};
}
