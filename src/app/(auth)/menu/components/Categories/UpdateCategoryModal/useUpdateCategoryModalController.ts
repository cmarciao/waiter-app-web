import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@/entities/Category';
import { useForm } from 'react-hook-form';

const updateProductSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export function useUpdateCategoryModalController(selectedCategory: Category, handleUpdateCategory: (category: Category) => void) {
	const { register, handleSubmit, formState: { errors, isValid } } = useForm<UpdateProductSchema>({
		resolver: zodResolver(updateProductSchema)
	});

	const onUpdateCategory = handleSubmit((data) => {
		const category = {
			id: selectedCategory?.id || '',
			...data
		};

		handleUpdateCategory(category);
	});

	return {
		onUpdateCategory,
		isValid,
		register,
		errors
	};
}
