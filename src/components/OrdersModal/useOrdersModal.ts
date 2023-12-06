import axios from 'axios';
import toast from 'react-hot-toast';

import { Order } from '@/types/Order';
import { ORDER_STATES } from '@/constants/order-states';
import { useUpdateOrderStatus } from '@/hooks/orders';

export function useOrdersModal(selectedOrder: Order, onCloseModal: () => void) {
	const { isUpdatingOrderStatus, updateOrderStatus } = useUpdateOrderStatus();

	async function handleChangeOrderStatus() {
		const newState = selectedOrder.orderState === ORDER_STATES.WAITING
			? ORDER_STATES.PREPARING
			: ORDER_STATES.FINISHED;

		try {
			await updateOrderStatus({
				id: selectedOrder.id,
				state: newState
			});

			onCloseModal();

			toast.success('Order updated successfulluy. ✔', {
				duration: 1000 * 3
			});
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when change order status.');
		}
	}

	return { isUpdatingOrderStatus, handleChangeOrderStatus };
}
