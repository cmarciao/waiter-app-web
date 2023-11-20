import { useState } from 'react';
import { Category } from '@/types/Category';
import { useGetAllCategories } from '@/hooks/categories';

export function useCategoriesTable() {
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [isOpenCreateCategoryModal, setIsOpenCreateCategoryModal] = useState(false);
	const [isOpenUpdateCategoryModal, setIsOpenUpdateCategoryModal] = useState(false);
	const [isOpenRemoveCategoryModal, setIsOpenRemoveCategoryModal] = useState(false);

	const { categories } = useGetAllCategories();

	function handleOpenUpdateCategoryModal(category: Category) {
		setSelectedCategory(category);
		setIsOpenUpdateCategoryModal(true);
	}

	function handleCloseUpdateCategoryModal() {
		setSelectedCategory(null);
		setIsOpenUpdateCategoryModal(false);
	}

	function handleOpenRemoveCategoryModal(category: Category) {
		setIsOpenRemoveCategoryModal(true);
		setSelectedCategory(category);
	}

	function handleCloseRemoveCategoryModal() {
		setIsOpenRemoveCategoryModal(false);
	}

	function handleOpenCreateCategoryModal() {
		setIsOpenCreateCategoryModal(true);
	}

	function handleCloseCreateCategoryModal() {
		setIsOpenCreateCategoryModal(false);
	}

	function closeModalWhenRemoveCategory() {
		if(isOpenUpdateCategoryModal) handleCloseUpdateCategoryModal();
		else handleCloseRemoveCategoryModal();
	}

	return {
		categories,
		selectedCategory,
		isOpenCreateCategoryModal,
		isOpenUpdateCategoryModal,
		isOpenRemoveCategoryModal,
		handleOpenCreateCategoryModal,
		handleCloseCreateCategoryModal,
		handleOpenUpdateCategoryModal,
		handleOpenRemoveCategoryModal,
		closeModalWhenRemoveCategory,
	};
}
