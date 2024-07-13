import { Order } from '@/types/Order';
import { useSearchParams } from 'next/navigation';

export function useOrdersBoard(orders: Order[]) {
	const searchParams = useSearchParams();
	const orderId = searchParams.get('orderId') || '';

	return {
		hasSomeModalOpened: orders.some((order) => order.id === orderId)
	};
}
