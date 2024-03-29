import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { Order } from '@/types/Order';
import { getHistoricById, removeHistoric } from '../actions';

export function useRemoveOrderModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const historicId = searchParams.get('historicId') || '';

	const [historic, setHistoric] = useState<Order | null>(null);
	const [, formAction] = useFormState(handleRemoveHistoricOrder, null);

	useEffect(() => {
		async function loadHistoric() {
			try {
				const response = await getHistoricById(historicId);
				setHistoric(response);
			} catch(e) {
				toast.error('Historic not found');
				router.push('/historic');
			}
		}

		loadHistoric();
	}, []);

	async function handleRemoveHistoricOrder() {
		try {
			await removeHistoric(historicId);

			toast.success('Historic deleted successfulluy. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	}

	return {
		historic,
		formAction,
		handleRemoveHistoricOrder
	};
}
