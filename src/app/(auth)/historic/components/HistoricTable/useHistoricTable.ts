import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Order } from '@/types/Order';
import { useGetHistoric } from '@/hooks/historic';

export function useHistoricTable(orderBy: string) {
	const navigate = useRouter();
	const [selectedOrder, setSelectedOrder] = useState<Order | null>();
	const [isOpenOrderDetailsModal, setIsOpenOrderDetailsModal] = useState(false);
	const [isOpenRemoveOrderModal, setIsOpenRemoveOrderModal] = useState(false);

	const {
		historic,
		isHistoricLoading
	} = useGetHistoric(orderBy);

	function toggleOrderBy() {
		if(orderBy === 'desc') navigate.push('/historic?orderBy=asc');
		else navigate.push('/historic?orderBy=desc');
	}

	function handleOpenOrderDetailsModal(order: Order) {
		setSelectedOrder(order);
		setIsOpenOrderDetailsModal(true);
	}

	function handleCloseOrderDetailsModal() {
		setSelectedOrder(null);
		setIsOpenOrderDetailsModal(false);
	}

	function handleOpenRemoveOrderModal(order: Order) {
		setSelectedOrder(order);
		setIsOpenRemoveOrderModal(true);
	}

	function handleCloseRemoveOrderModal() {
		setSelectedOrder(null);
		setIsOpenRemoveOrderModal(false);
	}

	return {
		historic,
		isHistoricLoading,
		selectedOrder,
		isOpenOrderDetailsModal,
		isOpenRemoveOrderModal,
		toggleOrderBy,
		handleOpenOrderDetailsModal,
		handleCloseOrderDetailsModal,
		handleOpenRemoveOrderModal,
		handleCloseRemoveOrderModal
	};
}
