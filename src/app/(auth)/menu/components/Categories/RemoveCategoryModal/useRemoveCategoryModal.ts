import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Category } from '@/types/Category';
import { getCategoryById, removeCategory } from './../actions';
import { useFormState } from 'react-dom';
import { ApiException } from '@/errors/ApiException';

export function useRemoveCategoryModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const categoryId = searchParams.get('categoryId') || '';

	const [category, setCategory] = useState<null | Category>(null);
	const [isRemovingCategory, setIsRemovingCategory] = useState(false);
	const [, formAction] = useFormState(handleRemoveCategory, null);

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

	async function handleRemoveCategory() {
		try {
			setIsRemovingCategory(true);

			await removeCategory(categoryId);

			toast.success('Category deleted successfulluy. ✔');
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);
		} finally {
			setIsRemovingCategory(false);
		}
	}

	return {
		category,
		isRemovingCategory,
		formAction,
		handleRemoveCategory,
	};
}
