import Link from 'next/link';
import { ArrowDown01, ArrowUp01, Eye, Trash2Icon } from 'lucide-react';

import { formatDate, formatPrice } from '@/utils/format-utils';
import { generateOrderCategoryName, generateOrderName } from '@/utils/order-utils';

import { Table } from '@/components/Table';
import { HistoricModals } from '../HistoricModals';

import HistoricService from '@/services/HistoricService';
import { EmptyInformation } from '@/components/EmptyInformation';

type HistoricTableProps = {
	orderBy: string;
}

export async function HistoricTable({orderBy}: HistoricTableProps) {
	const historic = await HistoricService.getHistoric(orderBy);

	const hasHistoric = historic.length > 0;

	return (
		<Table.Root className='mt-2'>
			{!hasHistoric && (
				<div className='flex items-center justify-center mt-[22vh]'>
					<EmptyInformation
						description='Não há pedidos em registro no momento.'
					/>
				</div>
			)}

			{hasHistoric && (
				<>
					<Table.Header title='Pedidos' amount={historic.length} />
					<Table.Content className='mt-4'>
						<Table.Head>
							<Table.Row>
								<Table.Th>Mesa</Table.Th>
								<Table.Th>
									<button className='flex items-center gap-2'>
										<span>Data</span>

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
								<Table.Th>Nome</Table.Th>
								<Table.Th>Categoria</Table.Th>
								<Table.Th>Total</Table.Th>
								<Table.Th>Ações</Table.Th>
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
					</Table.Content></>
			)}

			<HistoricModals />

		</Table.Root>
	);
}
