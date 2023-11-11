import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Ingredient } from '@/entities/Ingredient';

const updateIngredientSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type UpdateIngredientSchema = z.infer<typeof updateIngredientSchema>;

export function useUpdateIngredientModalController(selectedIngredient: Ingredient, handleUpdateIngredient: (ingredient: Ingredient) => void) {
	const { register, handleSubmit, formState: { errors, isValid } } = useForm<UpdateIngredientSchema>({
		resolver: zodResolver(updateIngredientSchema)
	});

	const onUpdateIngredient = handleSubmit((data) => {
		const ingredient = {
			id: selectedIngredient.id,
			...data
		};

		handleUpdateIngredient(ingredient);
	});

	return {
		onUpdateIngredient,
		isValid,
		register,
		errors
	};
}
