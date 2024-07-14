import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Order } from '@/types/Order';
import { ORDER_STATES } from '@/constants/order-states';
import { getOrderById, removeOrder, updateOrderStatus } from '@/app/(auth)/home/actions';
import { ApiException } from '@/errors/ApiException';

export function useOrdersModal(isOpen: boolean) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const orderId = searchParams.get('orderId') || '';

	// const { publish } = useWebsocket();
	const [order, setOrder] = useState<null | Order>(null);
	const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

	useEffect(() => {
		async function loadOrder() {
			try {
				const orders = await getOrderById(orderId);

				setOrder(orders);
			} catch(e) {
				const error = e as ApiException;
				toast.error(error.message);

				router.push('/home');
			}
		}

		if(isOpen) {
			loadOrder();
		}
	}, [isOpen]);

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
			const error = e as ApiException;
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
			const error = e as ApiException;
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
