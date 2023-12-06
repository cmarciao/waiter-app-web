import axios from 'axios';
import toast from 'react-hot-toast';

import { useCreateHistoric } from '@/hooks/historic';

export function useRefreshDayModal(onCloseModal: () => void) {
	const { createHistoric } = useCreateHistoric();

	async function handleRefreshDay() {
		try {
			await createHistoric();

			toast.success('Your day was refreshed! 🔃');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating product.');
		}
	}

	return { handleRefreshDay };
}
