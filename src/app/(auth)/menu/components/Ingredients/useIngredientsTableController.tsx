import { Ingredient } from '@/entities/Ingredient';
import { useCreateIngredient, useGetAllIngredients, useRemoveIngredient, useUpdateIngredient } from '@/hooks/ingredients';
import { CreateIngredientParam } from '@/services/ingredientsService/create';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useIngredientsTableController() {
	const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
	const [isOpenCreateIngredientModal, setIsOpenCreateIngredientModal] = useState(false);
	const [isOpenUpdateIngredientModal, setIsOpenUpdateIngredientModal] = useState(false);
	const [isOpenRemoveIngredientModal, setIsOpenRemoveIngredientModal] = useState(false);

	const { ingredients } = useGetAllIngredients();
	const { isCreatingIngredient, createIngredient } = useCreateIngredient();
	const { isUpdatingIngredient, updateIngredient } = useUpdateIngredient();
	const { isRemovingIngredient, removeIngredient } = useRemoveIngredient();

	function handleOpenCreateIngredientModal() {
		setIsOpenCreateIngredientModal(true);
	}

	function handleCloseCreateIngredientModal() {
		setIsOpenCreateIngredientModal(false);
	}

	async function handleCreateIngredient(ingredient: CreateIngredientParam) {
		try {
			await createIngredient(ingredient);

			toast.success('Ingredient created successfulluy. ✔');
			handleCloseCreateIngredientModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating ingredient.');
		}
	}

	function handleOpenRemoveIngredientModal(ingredient: Ingredient) {
		setIsOpenRemoveIngredientModal(true);
		setSelectedIngredient(ingredient);
	}

	function handleCloseRemoveIngredientModal() {
		setIsOpenRemoveIngredientModal(false);
		setSelectedIngredient(null);
	}

	async function handleRemoveIngredient() {
		try {
			await removeIngredient(selectedIngredient!.id);

			toast.success('Ingredient deleted successfulluy. ✔');

			if(isOpenRemoveIngredientModal) handleCloseRemoveIngredientModal();
			else handleCloseUpdateIngredientModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting ingredient.');
		}
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
		isCreatingIngredient,
		isUpdatingIngredient,
		isRemovingIngredient,
		isOpenCreateIngredientModal,
		isOpenUpdateIngredientModal,
		isOpenRemoveIngredientModal,
		handleCreateIngredient,
		handleUpdateIngredient,
		handleRemoveIngredient,
		handleOpenCreateIngredientModal,
		handleCloseCreateIngredientModal,
		handleOpenUpdateIngredientModal,
		handleCloseUpdateIngredientModal,
		handleOpenRemoveIngredientModal,
		handleCloseRemoveIngredientModal
	};
}
