import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';

import { Order } from '@/types/Order';
import { ApiException } from '@/errors/ApiException';

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
				const error = e as ApiException;
				toast.error(error.message);

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
			const error = e as ApiException;
			toast.error(error.message);
		}
	}

	return {
		historic,
		formAction,
		handleRemoveHistoricOrder
	};
}
