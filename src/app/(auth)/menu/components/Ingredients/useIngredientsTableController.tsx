import { Ingredient } from '@/entities/Ingredient';
import { useGetAllIngredients, useUpdateIngredient } from '@/hooks/ingredients';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useIngredientsTableController() {
	const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
	const [isOpenCreateIngredientModal, setIsOpenCreateIngredientModal] = useState(false);
	const [isOpenUpdateIngredientModal, setIsOpenUpdateIngredientModal] = useState(false);
	const [isOpenRemoveIngredientModal, setIsOpenRemoveIngredientModal] = useState(false);

	const { ingredients } = useGetAllIngredients();
	const { isUpdatingIngredient, updateIngredient } = useUpdateIngredient();

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

	async function handleUpdateIngredient(ingredient: Ingredient) {
		try {
			await updateIngredient(ingredient);

			toast.success('Ingredient updated successfulluy. ✔');
			handleCloseUpdateIngredientModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when updating ingredient.');
		}
	}

	return {
		ingredients,
		selectedIngredient,
		isUpdatingIngredient,
		isOpenCreateIngredientModal,
		isOpenUpdateIngredientModal,
		isOpenRemoveIngredientModal,
		handleUpdateIngredient,
		handleOpenCreateIngredientModal,
		handleCloseCreateIngredientModal,
		handleOpenUpdateIngredientModal,
		handleCloseUpdateIngredientModal,
		handleOpenRemoveIngredientModal,
		handleCloseRemoveIngredientModal
	};
}
