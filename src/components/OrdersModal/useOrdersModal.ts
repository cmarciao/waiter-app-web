import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Order } from '@/types/Order';
import { ORDER_STATES } from '@/constants/order-states';
import { getOrderById, removeOrder, updateOrderStatus } from '@/app/(auth)/home/actions';

export function useOrdersModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const orderId = searchParams.get('orderId') || '';

	const [order, setOrder] = useState<null | Order>(null);
	const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

	useEffect(() => {
		async function loadOrders() {
			try {
				const response = await getOrderById(orderId);

				setOrder(response);
			} catch(e) {
				const error = e as Error;
				toast.error(error.message);

				router.push('/home');
			}
		}

		loadOrders();
	}, []);

	async function handleChangeOrderStatus() {
		const newState = order?.orderState === ORDER_STATES.WAITING
			? ORDER_STATES.PREPARING
			: ORDER_STATES.FINISHED;

		try {
			setIsUpdatingOrder(true);

			await updateOrderStatus(orderId, newState);

			toast.success('Order updated successfulluy. ✔', {
				duration: 1000 * 3
			});
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		} finally {
			setIsUpdatingOrder(false);
		}
	}

	async function handleRemoveOrder() {
		try {
			setIsUpdatingOrder(true);

			await removeOrder(orderId);

			toast.success('Order updated successfulluy. ✔', {
				duration: 1000 * 3
			});
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		} finally {
			setIsUpdatingOrder(false);
		}
	}

	return {
		order,
		isUpdatingOrder,
		handleRemoveOrder,
		handleChangeOrderStatus
	};
}
