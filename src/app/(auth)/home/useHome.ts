import { useGetAllOrders } from '@/hooks/orders';
import { useSearchParams } from 'next/navigation';

export function useHome() {
	const { orders } = useGetAllOrders();

	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	return {
		orders,
		openedModal
	};
}
