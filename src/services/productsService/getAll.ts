import { Product } from '@/entities/Product';
import { httpClient } from '../httpClient';

type GetAllProductsResponse = Product[];

export async function getAll() {
	const { data } = await httpClient.get<GetAllProductsResponse>('/products', {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJiMGZkOC05NzViLTRlNzQtYjdkMi05ZDMxOGFlOTg1ZjAiLCJpYXQiOjE2OTgxODQ1NjUsImV4cCI6MTY5ODc4OTM2NX0.Dg_-CLIacOCQwGhcc9GzmsDT9Yr99qx4UMkFjYnUcrU'
		}
	});

	return data;
}
