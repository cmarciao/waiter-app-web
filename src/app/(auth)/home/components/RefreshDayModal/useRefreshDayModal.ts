import toast from 'react-hot-toast';

import { ApiException } from '@/errors/ApiException';
import { createHistoric } from '@/app/(auth)/historic/components/actions';

export function useRefreshDayModal() {
	async function handleRefreshDay() {
		try {
			await createHistoric();

			toast.success('Your day was refreshed! 🔃');
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);
		}
	}

	return { handleRefreshDay };
}
