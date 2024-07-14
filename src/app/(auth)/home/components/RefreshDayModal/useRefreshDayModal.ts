import toast from 'react-hot-toast';

import { ApiException } from '@/errors/ApiException';
import { createHistoric } from '@/app/(auth)/historic/components/actions';

export function useRefreshDayModal() {
	async function handleRefreshDay() {
		try {
			await createHistoric();

			toast.success('Os pedidos estão no histórico!');
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);
		}
	}

	return { handleRefreshDay };
}
