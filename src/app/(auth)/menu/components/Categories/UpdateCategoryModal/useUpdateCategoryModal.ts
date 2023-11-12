import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Category } from '@/entities/Category';
import { useUpdateCategory } from '@/hooks/categories';
import { useRemoveCategoryModal } from '../RemoveCategoryModal/useRemoveCategoryModal';

const updateProductSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export function useUpdateCategoryModal(selectedCategory: Category, handleCloseModal: () => void) {
	const { isUpdatingCategory, updateCategory } = useUpdateCategory();
	const { isRemovingCategory, handleRemoveCategory: onRemoveCategory } = useRemoveCategoryModal(selectedCategory, handleCloseModal);

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<UpdateProductSchema>({
		resolver: zodResolver(updateProductSchema)
	});

	const handleUpdateCategory = handleSubmit(async (data) => {
		try {
			const category = {
				id: selectedCategory.id,
				...data
			};

			await updateCategory(category);

			toast.success('Category updated successfulluy. ✔');
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when updating category.');
		}
	});

	function handleRemoveCategory() {
		onRemoveCategory();
	}

	return {
		isValid,
		register,
		errors,
		isUpdatingCategory,
		isRemovingCategory,
		handleUpdateCategory,
		handleRemoveCategory
	};
}
