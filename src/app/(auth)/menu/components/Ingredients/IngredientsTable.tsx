'use client';

import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Table } from '@/components/Table';
import { useIngredientsTableController } from './useIngredientsTableController';
import { AddIngredientModal } from './AddIngredientModal';
import { RemoveIngredientModal } from './RemoveIngredientModal';
import { UpdateIngredientModal } from './UpdateIngredientModal';

export function IngredientsTable() {
	const {
		ingredients,
		selectedIngredient,
		isCreatingIngredient,
		isUpdatingIngredient,
		isRemovingIngredient,
		isOpenCreateIngredientModal,
		isOpenUpdateIngredientModal,
		isOpenRemoveIngredientModal,
		handleCreateIngredient,
		handleUpdateIngredient,
		handleRemoveIngredient,
		handleOpenCreateIngredientModal,
		handleCloseCreateIngredientModal,
		handleOpenUpdateIngredientModal,
		handleCloseUpdateIngredientModal,
		handleOpenRemoveIngredientModal,
		handleCloseRemoveIngredientModal
	} = useIngredientsTableController();

	return (
		<>
			<Table.Root>
				<Table.Header title='Categories' amount={ingredients.length}>
					<Table.HeaderAction onClick={handleOpenCreateIngredientModal}>
						New ingredient
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
						{ingredients.map((ingredient) => (
							<Table.Row key={ingredient.id}>
								<Table.Td className='text-center'>{ingredient.emoji}</Table.Td>
								<Table.Td className='w-full px-10'>{ingredient.name}</Table.Td>
								<Table.Td className='pr-4'>
									<Table.Actions>
										<Table.Action
											icon={<PencilIcon />}
											onClick={() => handleOpenUpdateIngredientModal(ingredient)}
										/>
										<Table.Action
											icon={<Trash2Icon color='#D73035'/>}
											onClick={() => handleOpenRemoveIngredientModal(ingredient)}
										/>
									</Table.Actions>
								</Table.Td>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Content>
			</Table.Root>

			{isOpenCreateIngredientModal && (
				<AddIngredientModal
					isOpen={isOpenCreateIngredientModal}
					isAddingIngredient={isCreatingIngredient}
					onAddIngredient={handleCreateIngredient}
					onCloseModal={handleCloseCreateIngredientModal}
				/>
			)}

			{isOpenUpdateIngredientModal && (
				<UpdateIngredientModal
					isOpen={isOpenUpdateIngredientModal}
					handleCloseModal={handleCloseUpdateIngredientModal}
					handleRemoveIngredient={handleRemoveIngredient}
					handleUpdateIngredient={handleUpdateIngredient}
					ingredient={selectedIngredient!}
					isRemovingIngredient={isRemovingIngredient}
					isUpdatingIngredient={isUpdatingIngredient}

				/>
			)}

			{isOpenRemoveIngredientModal && (
				<RemoveIngredientModal
					ingredient={selectedIngredient!}
					isOpen={isOpenRemoveIngredientModal}
					onCloseModal={handleCloseRemoveIngredientModal}
					onRemoveIngredient={handleRemoveIngredient}
					isDeletingIngredient={isRemovingIngredient}
				/>
			)}
		</>
	);
}
