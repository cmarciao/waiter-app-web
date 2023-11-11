import { Ingredient } from '@/entities/Ingredient';
import { httpClient } from '../httpClient';

export type UpdateIngredientParams = Partial<Ingredient>;

export async function update({ id, ...ingredient }: UpdateIngredientParams) {
	const { data } = await httpClient.put(`/ingredients/${id}`, ingredient);
	return data;
}
