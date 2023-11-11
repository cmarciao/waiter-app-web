import { httpClient } from '../httpClient';

export type DeleteCategoryParams = {
	id: string;
}

export async function remove({ id }: DeleteCategoryParams) {
	const { data } = await httpClient.delete(`/categories/${id}`);
	return data;
}
