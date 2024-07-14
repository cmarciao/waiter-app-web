import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { Category } from '@/types/Category';

import { CategoriesModals } from '../CategoriesModals';
import CategoriesService from '@/services/CategoriesService';

export async function CategoriesTable() {
	const categories: Category[] = await CategoriesService.getCategories();

	return (
		<>
			<Table.Root>
				<Table.Header title='Categorias' amount={categories.length}>
					<Table.HeaderAction href='/menu?tab=categories&openedModal=creation'>
						Nova categoria
					</Table.HeaderAction>
				</Table.Header>

				<Table.Content className='mt-4'>
					<Table.Head>
						<Table.Row>
							<Table.Th>Emoji</Table.Th>
							<Table.Th className='w-full px-10'>Nome</Table.Th>
							<Table.Th>Ações</Table.Th>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{categories.map((categroy) => (
							<Table.Row key={categroy.id}>
								<Table.Td className='text-center'>{categroy.emoji}</Table.Td>
								<Table.Td className='w-full px-10'>{categroy.name}</Table.Td>
								<Table.Td className='pr-4'>
									<Table.Actions>
										<Table.Action
											icon={<PencilIcon color='#666' />}
											hrefAction={`/menu?tab=categories&openedModal=update&categoryId=${categroy.id}`}
										/>
										<Table.Action
											icon={<Trash2Icon color='#D73035'/>}
											hrefAction={`/menu?tab=categories&openedModal=removal&categoryId=${categroy.id}`}
										/>
									</Table.Actions>
								</Table.Td>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Content>
			</Table.Root>

			<CategoriesModals />
		</>
	);
}
