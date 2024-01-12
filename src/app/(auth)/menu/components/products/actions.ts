'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { Product } from '@/types/Product';
import ProductsService from '@/services/ProductsService';

export async function getProductById(id: string): Promise<Product> {
	const response = await ProductsService.getProductById(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export type CreateProductBody = {
    name: string;
    description: string;
    image: string;
    price: string;
    categoryId: string;
    ingredientIds: string;
}

export async function createProduct(product: FormData) {
	const response = await ProductsService.createProduct(product);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('products');
	redirect('/menu');
}

export async function updateProduct(id: string, product: FormData) {
	const response = await ProductsService.updateProduct(id, product);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('products');
	redirect('/menu?tab=products');
}

export async function removeProduct(id: string) {
	await ProductsService.removeProduct(id);

	revalidateTag('products');
	redirect('/menu?tab=products');
}
