import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Ingredient } from '@/types/Ingredient';
import { useRemoveIngredientModal } from '../RemoveIngredientModal/useRemoveIngredientModal';
import { getIngredientById, updateIngredient } from './../actions';

const updateIngredientSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

export type UpdateIngredientSchema = z.infer<typeof updateIngredientSchema>;

export function useUpdateIngredientModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const ingredientId = searchParams.get('ingredientId') || '';

	const [ingredient, setIngredient] = useState<Ingredient | null>(null);

	const {
		isRemovingIngredient,
		handleRemoveIngredient
	} = useRemoveIngredientModal();

	const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<UpdateIngredientSchema>({
		resolver: zodResolver(updateIngredientSchema)
	});

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

	const handleUpdateIngredient: () => void = handleSubmit(async (data) => {
		try {
			await updateIngredient(ingredientId, data);

			toast.success('Ingredient updated successfulluy. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	});

	return {
		ingredient,
		isValid,
		errors,
		isUpdatingIngredient: isSubmitting,
		isRemovingIngredient,
		register,
		handleUpdateIngredient,
		handleRemoveIngredient
	};
}
