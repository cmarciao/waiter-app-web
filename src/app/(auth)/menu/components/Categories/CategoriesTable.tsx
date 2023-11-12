'use client';

import { Table } from '@/components/Table';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useMenuController } from '../../useMenuController';
import { UpdateCategoryModal } from './UpdateCategoryModal';
import { RemoveCategoryModal } from './RemoveCategoryModal';
import { CreateCategoryModal } from './CreateCategoryModal';

export function CategoriesTable() {
	const {
		categories,
		selectedCategory,
		isOpenCreateCategoryModal,
		isOpenEditCategoryModal,
		isOpenRemoveCategoryModal,
		isUpdatingCategory,
		handleUpdateCategory,
		handleOpenCreateCategoryModal,
		handleCloseCreateCategoryModal,
		handleOpenEdictCategoryModal,
		handleCloseEdictCategoryModal,
		handleOpenRemoveCategoryModal,
		handleCloseRemoveCategoryModal
	} = useMenuController();

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
											onClick={() => handleOpenEdictCategoryModal(categroy)}
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

			{isOpenEditCategoryModal && (
				<UpdateCategoryModal
					isOpenEditCategoryModal={isOpenEditCategoryModal}
					handleCloseEdictCategoryModal={handleCloseEdictCategoryModal}
					handleRemoveCategory={() => {}}
					handleUpdateCategory={handleUpdateCategory}
					isRemovingCategory={false}
					isUpdatingCategory={isUpdatingCategory}
					selectedCategory={selectedCategory!}
				/>
			)}

			<RemoveCategoryModal
				category={selectedCategory!}
				isOpen={isOpenRemoveCategoryModal}
				onCloseModal={handleCloseRemoveCategoryModal}
			/>
		</>
	);
}
