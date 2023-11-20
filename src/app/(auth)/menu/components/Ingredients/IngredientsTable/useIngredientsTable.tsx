import { useState } from 'react';
import { Ingredient } from '@/types/Ingredient';
import { useGetAllIngredients } from '@/hooks/ingredients';

export function useIngredientsTable() {
	const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
	const [isOpenCreateIngredientModal, setIsOpenCreateIngredientModal] = useState(false);
	const [isOpenUpdateIngredientModal, setIsOpenUpdateIngredientModal] = useState(false);
	const [isOpenRemoveIngredientModal, setIsOpenRemoveIngredientModal] = useState(false);

	const { ingredients } = useGetAllIngredients();

	function handleOpenCreateIngredientModal() {
		setIsOpenCreateIngredientModal(true);
	}

	function handleCloseCreateIngredientModal() {
		setIsOpenCreateIngredientModal(false);
	}

	function handleOpenRemoveIngredientModal(ingredient: Ingredient) {
		setIsOpenRemoveIngredientModal(true);
		setSelectedIngredient(ingredient);
	}

	function handleCloseRemoveIngredientModal() {
		setIsOpenRemoveIngredientModal(false);
		setSelectedIngredient(null);
	}

	function handleOpenUpdateIngredientModal(ingredient: Ingredient) {
		setIsOpenUpdateIngredientModal(true);
		setSelectedIngredient(ingredient);
	}

	function handleCloseUpdateIngredientModal() {
		setIsOpenUpdateIngredientModal(false);
	}

	function closeModalWhenRemoveIngredient() {
		if(isOpenUpdateIngredientModal) handleCloseUpdateIngredientModal();
		else handleCloseRemoveIngredientModal();
	}

	return {
		ingredients,
		selectedIngredient,
		isOpenCreateIngredientModal,
		isOpenUpdateIngredientModal,
		isOpenRemoveIngredientModal,
		handleOpenCreateIngredientModal,
		handleCloseCreateIngredientModal,
		handleOpenUpdateIngredientModal,
		handleOpenRemoveIngredientModal,
		closeModalWhenRemoveIngredient
	};
}
