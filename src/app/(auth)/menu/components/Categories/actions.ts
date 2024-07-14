'use server';

import { RedirectType, redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import { Category } from '@/types/Category';
import CategoriesService from '@/services/CategoriesService';
import { CreateCategorySchema } from './CreateCategoryModal/useCreateCategoryModal';
import { httpTags } from '@/constants/http-tags';

export async function getCategoryById(id: string): Promise<Category> {	
	return CategoriesService.getCategoryById(id);	
}

export async function getCategories(): Promise<Category[]> {	
	return CategoriesService.getCategories();
}

export async function createCategory(category: CreateCategorySchema) {
	
	await CategoriesService.createCategory(category);

	revalidateTag(httpTags.categories);
	redirect('/menu?tab=categories', RedirectType.replace);
}

export async function updateCategory(id: string, category: CreateCategorySchema) {
	
	await CategoriesService.updateCategory(id, category);

	revalidateTag(httpTags.categories);
	redirect('/menu?tab=categories', RedirectType.replace);
}

export async function removeCategory(id: string) {
	await CategoriesService.removeCategory(id);

	revalidateTag(httpTags.categories);
	redirect('/menu?tab=categories', RedirectType.replace);
	
}
