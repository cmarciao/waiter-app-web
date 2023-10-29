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
