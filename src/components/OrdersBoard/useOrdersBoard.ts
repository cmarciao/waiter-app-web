import { useState } from 'react';
import { Order } from '@/types/Order';

export function useOrdersBoard() {
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isOpenOrderDetailsModal, setIsOpenOrderDetailsModal] = useState(false);


	function handleOpenOrderDetailsModal(order: Order) {
		setSelectedOrder(order);
		setIsOpenOrderDetailsModal(true);
	}

	function handleCloseOrderDetailsModal() {
		setSelectedOrder(null);
		setIsOpenOrderDetailsModal(false);
	}

	return {
		selectedOrder,
		isOpenOrderDetailsModal,
		handleOpenOrderDetailsModal,
		handleCloseOrderDetailsModal
	};

}
