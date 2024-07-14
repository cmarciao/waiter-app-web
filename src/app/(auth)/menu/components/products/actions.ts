'use server';

import { revalidateTag } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

import { Product } from '@/types/Product';
import ProductsService from '@/services/ProductsService';
import { httpTags } from '@/constants/http-tags';
import { APP_ROUTES } from '@/constants/app-routes';

export async function getProductById(id: string): Promise<Product> {
	return ProductsService.getProductById(id);
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
	await ProductsService.createProduct(product);

	revalidateTag(httpTags.products);
	redirect(APP_ROUTES.private.menu, RedirectType.replace);
}

export async function updateProduct(id: string, product: FormData) {
	await ProductsService.updateProduct(id, product);

	revalidateTag(httpTags.products);
	redirect('/menu?tab=products', RedirectType.replace);
}

export async function removeProduct(id: string) {
	await ProductsService.removeProduct(id);

	revalidateTag(httpTags.products);
	redirect('/menu?tab=products', RedirectType.replace);
}