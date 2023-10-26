import { Category } from '@/entities/Category';
import { httpClient } from '../httpClient';

type GetAllCategoriesResponse = Category[];

export async function getAll() {
	const { data } = await httpClient.get<GetAllCategoriesResponse>('/categories', {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJiMGZkOC05NzViLTRlNzQtYjdkMi05ZDMxOGFlOTg1ZjAiLCJpYXQiOjE2OTgxODQ1NjUsImV4cCI6MTY5ODc4OTM2NX0.Dg_-CLIacOCQwGhcc9GzmsDT9Yr99qx4UMkFjYnUcrU'
		}
	});

	return data;
}
