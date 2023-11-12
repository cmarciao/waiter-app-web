'use client';

import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { UpdateCategoryModal } from '../UpdateCategoryModal';
import { RemoveCategoryModal } from '../RemoveCategoryModal';
import { CreateCategoryModal } from '../CreateCategoryModal';

import { useCategoriesTable } from './useCategoriesTable';

export function CategoriesTable() {
	const {
		categories,
		selectedCategory,
		isOpenCreateCategoryModal,
		isOpenUpdateCategoryModal,
		isOpenRemoveCategoryModal,
		handleOpenCreateCategoryModal,
		handleCloseCreateCategoryModal,
		handleOpenUpdateCategoryModal,
		handleOpenRemoveCategoryModal,
		closeModalWhenRemoveCategory
	} = useCategoriesTable();

	return (
		<>
			<Table.Root>
				<Table.Header title='Categories' amount={categories.length}>
					<Table.HeaderAction onClick={handleOpenCreateCategoryModal}>
						New category
					</Table.HeaderAction>
				</Table.Header>

				<Table.Content>
					<Table.Head>
						<Table.Row>
							<Table.Th>Emoji</Table.Th>
							<Table.Th className='w-full px-10'>Name</Table.Th>
							<Table.Th>Action</Table.Th>
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
											icon={<PencilIcon />}
											onClick={() => handleOpenUpdateCategoryModal(categroy)}
										/>
										<Table.Action
											icon={<Trash2Icon color='#D73035'/>}
											onClick={() => handleOpenRemoveCategoryModal(categroy)}
										/>
									</Table.Actions>
								</Table.Td>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Content>
			</Table.Root>

			<CreateCategoryModal
				isOpen={isOpenCreateCategoryModal}
				onCloseModal={handleCloseCreateCategoryModal}
			/>

			<UpdateCategoryModal
				selectedCategory={selectedCategory!}
				isOpen={isOpenUpdateCategoryModal}
				handleCloseModal={closeModalWhenRemoveCategory}
			/>

			<RemoveCategoryModal
				category={selectedCategory!}
				isOpen={isOpenRemoveCategoryModal}
				onCloseModal={closeModalWhenRemoveCategory}
			/>
		</>
	);
}
