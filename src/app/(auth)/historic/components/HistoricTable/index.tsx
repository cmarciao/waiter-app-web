import Link from 'next/link';
import { ArrowDown01, ArrowUp01, Eye, Trash2Icon } from 'lucide-react';

import { formatDate, formatPrice } from '@/utils/format-utils';
import { generateOrderCategoryName, generateOrderName } from '@/utils/order-utils';

import { Table } from '@/components/Table';
import { HistoricModals } from '../HistoricModals';

import HistoricService from '@/services/HistoricService';

type HistoricTableProps = {
	orderBy: string;
}

export async function HistoricTable({orderBy}: HistoricTableProps) {
	const historic = await HistoricService.getHistoric(orderBy);

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Orders' amount={historic.length} />

			<Table.Content className='mt-4'>
				<Table.Head>
					<Table.Row>
						<Table.Th>Table</Table.Th>
						<Table.Th>
							<button className='flex items-center gap-2'>
								<span>Date</span>

								{orderBy === 'asc' && (
									<Link href='/historic?orderBy=desc'>
										<ArrowUp01 size={16} />
									</Link>
								)}

								{orderBy === 'desc' && (
									<Link href='/historic?orderBy=asc'>
										<ArrowDown01 size={16} />
									</Link>
								)}
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
										hrefAction={`/historic?openedModal=details&historicId=${order.id}`}
									/>
									<Table.Action
										icon={<Trash2Icon color='#D73035'/>}
										hrefAction={`/historic?openedModal=removal&historicId=${order.id}`}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			<HistoricModals />

		</Table.Root>
	);
}
