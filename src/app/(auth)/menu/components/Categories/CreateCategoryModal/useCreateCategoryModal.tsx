import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCreateCategory } from '@/hooks/categories';

const createCategorySchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export function useCreateCategoryModal(handleCloseCreateCategoryModal: () => void) {
	const { isCreatingCategory, createCategory } = useCreateCategory();
	const { register, handleSubmit, formState: { errors, isValid: isFormValid } } = useForm<CreateCategorySchema>({
		resolver: zodResolver(createCategorySchema)
	});

	const handleCreateCategory = handleSubmit(async (data) => {
		try {
			await createCategory(data);

			toast.success('Category created successfulluy. ✔');

			handleCloseCreateCategoryModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating category.');
		}
	});

	return {
		register,
		isFormValid,
		errors,
		isCreatingCategory,
		handleCreateCategory
	};
}
