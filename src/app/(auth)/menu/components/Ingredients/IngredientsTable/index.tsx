import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { Ingredient } from '@/types/Ingredient';

import { IngredientsModals } from '../IngredientsModals';
import IngredientsService from '@/services/IngredientsService';
import { EmptyInformation } from '@/components/EmptyInformation';

export async function IngredientsTable() {
	const ingredients: Ingredient[] = await IngredientsService.getIngredients();
	const hasIngredients = ingredients.length > 0;

	return (
		<>
			<Table.Root>
				<Table.Header title='Ingredientes' amount={ingredients.length}>
					<Table.HeaderAction href='/menu?tab=ingredients&openedModal=creation'>
						Novo ingrediente
					</Table.HeaderAction>
				</Table.Header>

				{!hasIngredients && (
					<div className='flex items-center justify-center mt-[22vh]'>
						<EmptyInformation
							description='Não há ingredientes cadastrados no momento.'
						/>
					</div>
				)}

				{hasIngredients && (
					<Table.Content className='mt-4'>
						<Table.Head>
							<Table.Row>
								<Table.Th>Emoji</Table.Th>
								<Table.Th className='w-full px-10'>Nome</Table.Th>
								<Table.Th>Ações</Table.Th>
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
												icon={<PencilIcon color='#666' />}
												hrefAction={`/menu?tab=ingredients&openedModal=update&ingredientId=${ingredient.id}`}
											/>

											<Table.Action
												icon={<Trash2Icon color='#D73035'/>}
												hrefAction={`/menu?tab=ingredients&openedModal=removal&ingredientId=${ingredient.id}`}
											/>
										</Table.Actions>
									</Table.Td>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Content>
				)}
			</Table.Root>

			<IngredientsModals />
		</>
	);
}
