import { z } from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createCategory } from './../actions';

const createCategorySchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export function useCreateCategoryModal() {
	const { register, handleSubmit, formState: { errors, isValid: isFormValid, isSubmitting } } = useForm<CreateCategorySchema>({
		resolver: zodResolver(createCategorySchema)
	});

	const handleCreateCategory: () => void = handleSubmit(async (data) => {
		try {
			await createCategory(data);

			toast.success('Category created successfulluy. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	});

	return {
		errors,
		isFormValid,
		isCreatingCategory: isSubmitting,
		register,
		handleCreateCategory
	};
}
