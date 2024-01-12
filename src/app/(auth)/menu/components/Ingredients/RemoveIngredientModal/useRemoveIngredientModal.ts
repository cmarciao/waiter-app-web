import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Ingredient } from '@/types/Ingredient';
import { getIngredientById, removeIngredient } from './../actions';

export function useRemoveIngredientModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const ingredientId = searchParams.get('ingredientId') || '';

	const [ingredient, setIngredient] = useState<Ingredient | null>(null);
	const [isRemovingIngredient, setIsRemovingIngredient] = useState(false);
	const [, formAction] = useFormState(handleRemoveIngredient, null);

	useEffect(() => {
		async function loadIngredient() {
			try {
				const response = await getIngredientById(ingredientId);

				setIngredient(response);
			} catch(e) {
				const error = e as Error;
				toast.error(error.message);

				router.push('/menu?tab=ingredients');
			}
		}

		loadIngredient();
	}, []);

	async function handleRemoveIngredient() {
		try {
			setIsRemovingIngredient(true);

			await removeIngredient(ingredientId);

			toast.success('Ingredient deleted successfulluy. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		} finally {
			setIsRemovingIngredient(false);
		}
	}

	return {
		ingredient,
		isRemovingIngredient,
		formAction,
		handleRemoveIngredient
	};
}
