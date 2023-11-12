import axios from 'axios';
import toast from 'react-hot-toast';
import { Ingredient } from '@/entities/Ingredient';
import { useRemoveIngredient } from '@/hooks/ingredients';

export function useRemoveIngredientModal(selectedIngredient:Ingredient, onCloseModal: () => void) {
	const { isRemovingIngredient, removeIngredient } = useRemoveIngredient();

	async function handleRemoveIngredient() {
		try {
			await removeIngredient(selectedIngredient.id);

			toast.success('Ingredient deleted successfulluy. ✔');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting ingredient.');
		}
	}

	return {
		isRemovingIngredient,
		handleRemoveIngredient
	};
}
