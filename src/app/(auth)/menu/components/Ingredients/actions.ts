'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateIngredientSchema } from './CreateIngredientModal/useCreateIngredientModal';
import { UpdateIngredientSchema } from './UpdateIngredientModal/useUpdateIngredientModal';

import { Ingredient } from '@/types/Ingredient';
import IngredientsService from '@/services/IngredientsService';
import { APIError } from '@/errors/APIError';
import { httpTags } from '@/constants/http-tags';

export async function getIngredientById(id: string): Promise<Ingredient> {
	try {
		return IngredientsService.getIngredientById(id);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function getIngredients(): Promise<Ingredient[]> {
	try {
		return IngredientsService.getIngredients();
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function createIngredient(ingredient: CreateIngredientSchema, redirectUrl: string) {
	try {
		await IngredientsService.createIngredient(ingredient);

		revalidateTag(httpTags.ingredients);
		redirect(redirectUrl);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function updateIngredient(id: string, ingredient: UpdateIngredientSchema) {
	try {
		await IngredientsService.updateIngredient(id, ingredient);

		revalidateTag(httpTags.ingredients);
		redirect('/menu?tab=ingredients');
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function removeIngredient(id: string) {
	try {
		await IngredientsService.removeIngredient(id);

		revalidateTag(httpTags.ingredients);
		redirect('/menu?tab=ingredients');
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}
