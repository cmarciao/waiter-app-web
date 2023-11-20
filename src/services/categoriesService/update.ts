import { Category } from '@/types/Category';
import { httpClient } from '../httpClient';

export type UpdateCategoryParams = Partial<Category>

export async function update({ id, ...category }: UpdateCategoryParams) {
	const { data } = await httpClient.put(`/categories/${id}`, category);
	return data;
}
