import axios from 'axios';
import toast from 'react-hot-toast';

import { Category } from '@/entities/Category';
import { useRemoveCategory } from '@/hooks/categories';

export function useRemoveCategoryModal(selectedCategory: Category, handleCloseModal: () => void) {
	const { isRemovingCategory, removeCategory } = useRemoveCategory();

	async function handleRemoveCategory() {
		try {
			if(selectedCategory) {
				await removeCategory({ id: selectedCategory.id });
			}

			toast.success('Category deleted successfulluy. ✔');

			handleCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting category.');
		}
	}

	return {
		isRemovingCategory,
		handleRemoveCategory
	};
}
