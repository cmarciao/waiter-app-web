import { httpClient } from '../httpClient';

export type CreateProductParams = {
    name: string;
    description: string;
    image: File;
    price: number;
    ingredientIds: string[];
    categoryId: string,
}

export async function create(params: CreateProductParams) {
	const form = new FormData();

	Object.entries(params).forEach(([key, value]) => {
		if(value instanceof File) {
			form.append(key, value);
		} else if(typeof value === 'string') {
			form.append(key, value);
		} else {
			form.append(key, JSON.stringify(value));
		}
	});

	const { data } = await httpClient.post('/products', form, {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWJiMGZkOC05NzViLTRlNzQtYjdkMi05ZDMxOGFlOTg1ZjAiLCJpYXQiOjE2OTgxODQ1NjUsImV4cCI6MTY5ODc4OTM2NX0.Dg_-CLIacOCQwGhcc9GzmsDT9Yr99qx4UMkFjYnUcrU'
		}
	});

	return data;
}
