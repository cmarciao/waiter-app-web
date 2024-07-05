'use server';

import { revalidateTag } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

import { Product } from '@/types/Product';
import ProductsService from '@/services/ProductsService';
import { APIError } from '@/errors/APIError';
import { httpTags } from '@/constants/http-tags';
import { APP_ROUTES } from '@/constants/app-routes';

export async function getProductById(id: string): Promise<Product> {
	try {
		return ProductsService.getProductById(id);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
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
	try {
		await ProductsService.createProduct(product);

		revalidateTag(httpTags.products);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	} finally {
		redirect(APP_ROUTES.private.menu, RedirectType.replace);
	}
}

export async function updateProduct(id: string, product: FormData) {
	try {
		await ProductsService.updateProduct(id, product);

		revalidateTag(httpTags.products);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	} finally {
		redirect('/menu?tab=products', RedirectType.replace);
	}
}

export async function removeProduct(id: string) {
	try {
		await ProductsService.removeProduct(id);

		revalidateTag(httpTags.products);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	} finally {
		redirect('/menu?tab=products', RedirectType.replace);
	}
}
