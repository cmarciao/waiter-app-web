import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { Order } from '@/types/Order';
import { getHistoricById } from '../actions';

export function useHistoricDetailsModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const historicId = searchParams.get('historicId') || '';

	const [historic, setHistoric] = useState<Order | null>(null);

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

	return {
		historic
	};
}
