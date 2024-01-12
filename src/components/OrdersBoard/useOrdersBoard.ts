import { useSearchParams } from 'next/navigation';

export function useOrdersBoard() {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	return {
		hasSomeModalOpened: openedModal === 'order-details'
	};
}
