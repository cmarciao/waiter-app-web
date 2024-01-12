'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import { Category } from '@/types/Category';
import CategoriesService from '@/services/CategoriesService';
import { CreateCategorySchema } from './CreateCategoryModal/useCreateCategoryModal';

export async function getCategoryById(id: string): Promise<Category> {
	const response = await CategoriesService.getCategoryById(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function getCategories(): Promise<Category[]> {
	const response = await CategoriesService.getCategories();

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function createCategory(category: CreateCategorySchema) {
	const response = await CategoriesService.createCategory(category);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('categories');
	redirect('/menu?tab=categories');
}

export async function updateCategory(id: string, category: CreateCategorySchema) {
	const response = await CategoriesService.updateCategory(id, category);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('categories');
	redirect('/menu?tab=categories');
}

export async function removeCategory(id: string) {
	await CategoriesService.removeCategory(id);

	revalidateTag('categories');
	redirect('/menu?tab=categories');
}
