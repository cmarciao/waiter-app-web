'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import { Category } from '@/types/Category';
import CategoriesService from '@/services/CategoriesService';
import { CreateCategorySchema } from './CreateCategoryModal/useCreateCategoryModal';
import { APIError } from '@/errors/APIError';
import { httpTags } from '@/constants/http-tags';

export async function getCategoryById(id: string): Promise<Category> {
	try {
		return CategoriesService.getCategoryById(id);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function getCategories(): Promise<Category[]> {
	try {
		return CategoriesService.getCategories();
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function createCategory(category: CreateCategorySchema) {
	try {
		await CategoriesService.createCategory(category);

		revalidateTag(httpTags.categories);
		redirect('/menu?tab=categories');
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function updateCategory(id: string, category: CreateCategorySchema) {
	try {
		await CategoriesService.updateCategory(id, category);

		revalidateTag(httpTags.categories);
		redirect('/menu?tab=categories');
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function removeCategory(id: string) {
	try {
		await CategoriesService.removeCategory(id);

		revalidateTag(httpTags.categories);
		redirect('/menu?tab=categories');
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}
