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

	const { data } = await httpClient.post('/products', form);

	return data;
}
