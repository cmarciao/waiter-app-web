import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Ingredient } from '@/entities/Ingredient';
import { useUpdateIngredient } from '@/hooks/ingredients';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRemoveIngredientModal } from '../RemoveIngredientModal/useRemoveIngredientModal';

const updateIngredientSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type UpdateIngredientSchema = z.infer<typeof updateIngredientSchema>;

export function useUpdateIngredientModal(selectedIngredient: Ingredient, onCloseModal: () => void) {
	const { isUpdatingIngredient, updateIngredient } = useUpdateIngredient();
	const {
		isRemovingIngredient,
		handleRemoveIngredient: onRemoveIngredient
	} = useRemoveIngredientModal(selectedIngredient, onCloseModal);

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<UpdateIngredientSchema>({
		resolver: zodResolver(updateIngredientSchema)
	});

	const handleUpdateIngredient = handleSubmit(async (data) => {
		try {
			const ingredient = {
				id: selectedIngredient.id,
				...data
			};

			await updateIngredient(ingredient);

			toast.success('Ingredient updated successfulluy. ✔');
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when updating ingredient.');
		}
	});

	function handleRemoveIngredient() {
		onRemoveIngredient();
	}

	return {
		isValid,
		register,
		errors,
		isUpdatingIngredient,
		isRemovingIngredient,
		handleUpdateIngredient,
		handleRemoveIngredient
	};
}
