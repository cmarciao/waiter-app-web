import { Ingredient } from '@/types/Ingredient';
import { httpClient } from '../httpClient';

type CreateProductResponse = Ingredient[];

export async function getAlll() {
	const { data } = await httpClient.get<CreateProductResponse>('/ingredients');
	return data;
}
