import { Category } from '@/types/Category';
import { httpClient } from '../httpClient';

export type CreateCategoryParams = Omit<Category, 'id'>

export async function create(category: CreateCategoryParams) {
	const { data } = await httpClient.post('/categories/', category);
	return data;
}
