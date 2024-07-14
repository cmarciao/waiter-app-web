'use server';

import { revalidateTag } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

import { CreateIngredientSchema } from './CreateIngredientModal/useCreateIngredientModal';
import { UpdateIngredientSchema } from './UpdateIngredientModal/useUpdateIngredientModal';

import { Ingredient } from '@/types/Ingredient';
import IngredientsService from '@/services/IngredientsService';
import { httpTags } from '@/constants/http-tags';

export async function getIngredientById(id: string): Promise<Ingredient> {
	return IngredientsService.getIngredientById(id);
}

export async function getIngredients(): Promise<Ingredient[]> {
	return IngredientsService.getIngredients();
}

export async function createIngredient(ingredient: CreateIngredientSchema, redirectUrl: string) {
	await IngredientsService.createIngredient(ingredient);

	revalidateTag(httpTags.ingredients);
	redirect(redirectUrl, RedirectType.replace);
}

export async function updateIngredient(id: string, ingredient: UpdateIngredientSchema) {
	await IngredientsService.updateIngredient(id, ingredient);

	revalidateTag(httpTags.ingredients);
	redirect('/menu?tab=ingredients', RedirectType.replace);
	
}

export async function removeIngredient(id: string) {
	await IngredientsService.removeIngredient(id);

	revalidateTag(httpTags.ingredients);
	redirect('/menu?tab=ingredients', RedirectType.replace);
	
}
