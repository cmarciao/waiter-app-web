import { httpClient } from '../httpClient';
import { Product } from '@/entities/Product';

type CreateProductParam = Product;

export async function create(product: CreateProductParam) {
	const { data } = await httpClient.post('/products', product);
	return data;
}
