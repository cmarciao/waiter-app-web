import { useState } from 'react';
import { useGetAllOrders } from '@/hooks/orders';

export function useHome() {
	const [isOpenRefreshDayModal, setIsOpenRefreshDayModal] = useState(false);

	const { orders } = useGetAllOrders();

	function handleOpenRefreshDayModal() {
		setIsOpenRefreshDayModal(true);
	}

	function handleCloseRefreshDayModal() {
		setIsOpenRefreshDayModal(false);
	}

	return {
		orders,
		isOpenRefreshDayModal,
		handleOpenRefreshDayModal,
		handleCloseRefreshDayModal
	};
}
