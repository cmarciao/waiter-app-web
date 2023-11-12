import axios from 'axios';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreateIngredient } from '@/hooks/ingredients';

const addIngredientSchema = z.object({
	emoji: z.string().min(1, { message: 'Emoji is required.' }),
	name: z.string().min(1, { message: 'Name is required.' }),
});

type AddIngredientSchema = z.infer<typeof addIngredientSchema>;

export function useCreateIngredientModal(
	onCloseModal: () => void
) {
	const { isCreatingIngredient, createIngredient } = useCreateIngredient();
	const { register, handleSubmit, formState: { errors, isValid: isFormValid } } = useForm<AddIngredientSchema>({
		resolver: zodResolver(addIngredientSchema)
	});

	const handleCreateIngredient = handleSubmit(async (data) => {
		try {
			await createIngredient(data);

			toast.success('Ingredient created successfulluy. ✔');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating ingredient.');
		}
	});

	return {
		register,
		isFormValid,
		errors,
		isCreatingIngredient,
		handleCreateIngredient
	};
}
