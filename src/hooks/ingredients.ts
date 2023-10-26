import { ingredientsService } from '@/services/ingredientsService';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useCreateIngredient() {
	const { isLoading: isCreatingIngredient, mutateAsync: createIngredient } = useMutation({
		mutationKey: ['ingredients'],
		mutationFn: ingredientsService.create
	});

	return {
		isCreatingIngredient,
		createIngredient
	};
}

export function useGetAllIngredients() {
	const queryClient = useQueryClient();

	const { data: ingredients } = useQuery({
		queryFn: ingredientsService.getAlll,
		onSuccess: () => {
			queryClient.invalidateQueries(['ingredients']);
		}
	});

	return {
		ingredients: ingredients || []
	};
}
