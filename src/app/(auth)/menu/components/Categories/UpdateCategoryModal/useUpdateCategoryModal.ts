import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Category } from '@/types/Category';
import { useRemoveCategoryModal } from '../RemoveCategoryModal/useRemoveCategoryModal';
import { getCategoryById, updateCategory } from './../actions';
import { ApiException } from '@/errors/ApiException';

const updateProductSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export function useUpdateCategoryModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const categoryId = searchParams.get('categoryId') || '';

	const [category, setCategory] = useState<null | Category>(null);

	const { isRemovingCategory, handleRemoveCategory } = useRemoveCategoryModal();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting }
	} = useForm<UpdateProductSchema>({
		resolver: zodResolver(updateProductSchema)
	});

	useEffect(() => {
		async function loadCategory() {
			try {
				const response = await getCategoryById(categoryId);
				setCategory(response);
			} catch(e) {
				const error = e as ApiException;
				toast.error(error.message);

				router.push('/menu?tab=categories');
			}
		}

		loadCategory();
	}, []);

	const handleUpdateCategory = handleSubmit(async (data) => {
		try {
			await updateCategory(categoryId, data);

			toast.success('Category updated successfulluy. ✔');
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);

			router.push('/menu?tab=categories');
		}
	});

	return {
		isValid,
		category,
		errors,
		isRemovingCategory,
		isUpdatingCategory: isSubmitting,
		register,
		handleUpdateCategory,
		handleRemoveCategory
	};
}
