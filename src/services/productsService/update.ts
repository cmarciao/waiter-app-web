import { httpClient } from '../httpClient';

export type UpdateProductParams = {
	id?: string;
    name: string;
    description: string;
    image?: File;
    price: number;
    ingredientIds: string[];
    categoryId: string,
}

export async function update(product: UpdateProductParams) {
	const {id, ...body} = product;

	const form = new FormData();

	Object.entries(body).forEach(([key, value]) => {
		if(value instanceof File) {
			form.append(key, value);
		} else if(typeof value === 'string') {
			form.append(key, value);
		} else {
			form.append(key, JSON.stringify(value));
		}
	});


	const { data } = await httpClient.put(`/products/${id}`, form);
	return data;
}
