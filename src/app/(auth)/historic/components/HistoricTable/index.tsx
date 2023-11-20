'use client';

import { ArrowDown01, ArrowUp01, Eye, Trash2Icon } from 'lucide-react';

import { formatDate, formatPrice } from '@/utils/format-utils';
import { generateOrderCategoryName, generateOrderName } from '@/utils/order-utils';

import { Table } from '@/components/Table';
import { Spinner } from '@/components/Spinner';
import { OrderDetailsModal } from '../OrderDetailsModal';
import { RemoveOrderModalModal } from '../RemoveOrderModal';

import { useHistoricTable } from './useHistoricTable';

type HistoricTableProps = {
	orderBy: string;
}

export function HistoricTable({orderBy}: HistoricTableProps) {
	const {
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
	} = useHistoricTable(orderBy);

	if(isHistoricLoading) {
		return (
			<div className='w-full flex items-center justify-center h-[calc(100vh-350px)]'>
				<Spinner size={48} />
			</div>
		);
	}

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Orders' amount={historic.length} />

			<Table.Content className='mt-4'>
				<Table.Head>
					<Table.Row>
						<Table.Th>Table</Table.Th>
						<Table.Th>
							<button className='flex items-center gap-2' onClick={toggleOrderBy} >
								<span>Date</span>
								{orderBy === 'asc' && <ArrowUp01 size={16} />}
								{orderBy === 'desc' && <ArrowDown01 size={16} />}
							</button>
						</Table.Th>
						<Table.Th>Name</Table.Th>
						<Table.Th>Category</Table.Th>
						<Table.Th>Total</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{historic.map((order) => (
						<Table.Row key={order.id}>
							<Table.Td>{order.table}</Table.Td>
							<Table.Td>{formatDate(new Date(order.createdAt))}</Table.Td>
							<Table.Td>{generateOrderName(order)}</Table.Td>
							<Table.Td>{generateOrderCategoryName(order)}</Table.Td>
							<Table.Td>{formatPrice(order.total)}</Table.Td>
							<Table.Td>
								<Table.Actions>
									<Table.Action
										icon={<Eye />}
										onClick={() => handleOpenOrderDetailsModal(order)}
									/>
									<Table.Action
										icon={<Trash2Icon color='#D73035'/>}
										onClick={() => handleOpenRemoveOrderModal(order)}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			<OrderDetailsModal
				selectedOrder={selectedOrder!}
				isOpen={isOpenOrderDetailsModal && !!selectedOrder}
				handleCloseModal={handleCloseOrderDetailsModal}
			/>

			<RemoveOrderModalModal
				selectedOrder={selectedOrder!}
				isOpen={isOpenRemoveOrderModal && !!selectedOrder}
				handleCloseModal={handleCloseRemoveOrderModal}
			/>

		</Table.Root>
	);
}
