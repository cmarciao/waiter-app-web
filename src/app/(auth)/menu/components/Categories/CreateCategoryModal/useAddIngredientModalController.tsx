import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateIngredientParam } from '@/services/ingredientsService/create';

const createCategorySchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type CategoryIngredientSchema = z.infer<typeof createCategorySchema>;

export function useCategoryIngredientModalController(
	onCategoryIngredient: (ingredient: CreateIngredientParam) => Promise<void>
) {
	const { register, handleSubmit, formState: { errors, isValid: isFormValid } } = useForm<CategoryIngredientSchema>({
		resolver: zodResolver(createCategorySchema)
	});

	const handleCreateCategory = handleSubmit(async (data) => {
		await onCategoryIngredient(data);
	});

	return {
		register,
		isFormValid,
		errors,
		handleCreateCategory
	};
}
