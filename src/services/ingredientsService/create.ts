import { httpClient } from '../httpClient';
import { Product } from '@/entities/Product';

type CreateProductParam = Product;

export async function create(product: CreateProductParam) {
	const { data } = await httpClient.post('/products', product, {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJiMGZkOC05NzViLTRlNzQtYjdkMi05ZDMxOGFlOTg1ZjAiLCJpYXQiOjE2OTgxODQ1NjUsImV4cCI6MTY5ODc4OTM2NX0.Dg_-CLIacOCQwGhcc9GzmsDT9Yr99qx4UMkFjYnUcrU'
		}
	});
	return data;
}
