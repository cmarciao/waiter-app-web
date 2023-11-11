import { ingredientsService } from '@/services/ingredientsService';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useCreateIngredient() {
	const queryClient = useQueryClient();

	const { isLoading: isCreatingIngredient, mutateAsync: createIngredient } = useMutation({
		mutationFn: ingredientsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries(['ingredients']);
		}
	});

	return {
		isCreatingIngredient,
		createIngredient
	};
}

export function useGetAllIngredients() {
	const { data: ingredients } = useQuery({
		queryKey: ['ingredients'],
		queryFn: ingredientsService.getAlll
	});

	return {
		ingredients: ingredients || []
	};
}

export function useUpdateIngredient() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdatingIngredient, mutateAsync: updateIngredient} = useMutation({
		mutationFn: ingredientsService.update,
		onSuccess: () => {
			queryClient.invalidateQueries(['ingredients']);
		}
	});

	return { isUpdatingIngredient, updateIngredient };
}

export function useRemoveIngredient() {
	const queryClient = useQueryClient();

	const { isLoading: isRemovingIngredient, mutateAsync: removeIngredient} = useMutation({
		mutationFn: ingredientsService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries(['ingredients']);
		}
	});

	return { isRemovingIngredient, removeIngredient };
}
