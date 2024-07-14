import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createIngredient } from './../actions';
import { ApiException } from '@/errors/ApiException';

const createIngredientSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

export type CreateIngredientSchema = z.infer<typeof createIngredientSchema>;

export function useCreateIngredientModal() {
	const searchParams = useSearchParams();
	const hasIngredientParam = searchParams.get('ingredient');
	const redirectUrl = hasIngredientParam ? '/menu?openedModal=creation' : '/menu?tab=ingredients';

	const { register, handleSubmit, formState: { errors, isValid: isFormValid, isSubmitting } } = useForm<CreateIngredientSchema>({
		resolver: zodResolver(createIngredientSchema)
	});

	const handleCreateIngredient = handleSubmit(async (data) => {
		try {
			await createIngredient(data, redirectUrl);

			toast.success('Ingredient created successfulluy. ✔');
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);
		}
	});

	return {
		redirectUrl,
		isFormValid,
		errors,
		isCreatingIngredient: isSubmitting,
		register,
		handleCreateIngredient
	};
}
