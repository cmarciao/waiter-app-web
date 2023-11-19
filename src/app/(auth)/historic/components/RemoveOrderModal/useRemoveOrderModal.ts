import { Order } from '@/entities/Order';
import { useRemoveHistoricOrder } from '@/hooks/historic';
import axios from 'axios';
import toast from 'react-hot-toast';

export function useRemoveOrderModal(order: Order, onCloseModal: () => void) {
	const { isRemovingHistoricOrder, removeHistoricOrder } = useRemoveHistoricOrder();

	async function handleRemoveHistoricOrder() {
		try {
			await removeHistoricOrder(order.id);

			toast.success('Ingredient deleted successfulluy. ✔');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting ingredient.');
		}
	}

	return {
		isRemovingHistoricOrder,
		handleRemoveHistoricOrder
	};
}
