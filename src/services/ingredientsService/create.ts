import { Ingredient } from '@/entities/Ingredient';
import { httpClient } from '../httpClient';

export type CreateIngredientParam = Omit<Ingredient, 'id'>;

export async function create(ingredient: CreateIngredientParam) {
	const { data } = await httpClient.post('/ingredients', ingredient);
	return data;
}
