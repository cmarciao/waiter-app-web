import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateIngredientParam } from '@/services/ingredientsService/create';

const addIngredientSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type AddIngredientSchema = z.infer<typeof addIngredientSchema>;

export function useAddIngredientModalController(
	onAddIngredient: (ingredient: CreateIngredientParam) => Promise<void>
) {
	const { register, handleSubmit, formState: { errors, isValid: isFormValid } } = useForm<AddIngredientSchema>({
		resolver: zodResolver(addIngredientSchema)
	});

	const handleAddIngredient = handleSubmit(async (data) => {
		await onAddIngredient(data);
	});

	return {
		register,
		isFormValid,
		errors,
		handleAddIngredient
	};
}
