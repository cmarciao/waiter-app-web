'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateIngredientSchema } from './CreateIngredientModal/useCreateIngredientModal';
import { UpdateIngredientSchema } from './UpdateIngredientModal/useUpdateIngredientModal';

import { Ingredient } from '@/types/Ingredient';
import IngredientsService from '@/services/IngredientsService';

export async function getIngredientById(id: string): Promise<Ingredient> {
	const response = await IngredientsService.getIngredientById(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function getIngredients(): Promise<Ingredient[]> {
	const response = await IngredientsService.getIngredients();

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function createIngredient(ingredient: CreateIngredientSchema, redirectUrl: string) {
	const response = await IngredientsService.createIngredient(ingredient);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('ingredients');
	redirect(redirectUrl);
}

export async function updateIngredient(id: string, ingredient: UpdateIngredientSchema) {
	const response = await IngredientsService.updateIngredient(id, ingredient);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('ingredients');
	redirect('/menu?tab=ingredients');
}

export async function removeIngredient(id: string) {
	await IngredientsService.removeIngredient(id);

	revalidateTag('ingredients');
	redirect('/menu?tab=ingredients');
}
