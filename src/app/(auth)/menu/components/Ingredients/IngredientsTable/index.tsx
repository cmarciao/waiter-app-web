import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { Ingredient } from '@/types/Ingredient';

import { IngredientsModals } from '../IngredientsModals';
import IngredientsService from '@/services/IngredientsService';

export async function IngredientsTable() {
	const ingredients: Ingredient[] = await IngredientsService.getIngredients();

	return (
		<>
			<Table.Root>
				<Table.Header title='Categories' amount={ingredients.length}>
					<Table.HeaderAction href='/menu?tab=ingredients&openedModal=creation'>
						New ingredient
					</Table.HeaderAction>
				</Table.Header>

				<Table.Content className='mt-4'>
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
			</Table.Root>

			<IngredientsModals />
		</>
	);
}
