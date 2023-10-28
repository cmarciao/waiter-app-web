import { Product } from '@/entities/Product';
import { httpClient } from '../httpClient';

type GetAllProductsResponse = Product[];

export async function getAll() {
	const { data } = await httpClient.get<GetAllProductsResponse>('/products');
	return data;
}
