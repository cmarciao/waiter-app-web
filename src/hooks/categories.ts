import { useMutation, useQuery, useQueryClient } from 'react-query';
import { categoriesService } from '@/services/categoriesService';

export function useGetAllCategories() {
	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: categoriesService.getAll
	});

	return {
		categories: categories || []
	};
}

export function useCreateCategory() {
	const queryClient = useQueryClient();

	const {isLoading: isCreatingCategory, mutateAsync: createCategory} = useMutation({
		mutationFn: categoriesService.create,
		onSuccess: () => {
			queryClient.invalidateQueries(['categories']);
		}
	});

	return { isCreatingCategory, createCategory };
}

export function useUpdateCategory() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdatingCategory, mutateAsync: updateCategory } = useMutation({
		mutationFn: categoriesService.update,
		onSuccess: () => {
			queryClient.invalidateQueries('categories');
		}
	});

	return { updateCategory, isUpdatingCategory };
}

export function useRemoveCategory() {
	const queryClient = useQueryClient();

	const { isLoading: isRemovingCategory, mutateAsync: removeCategory } = useMutation({
		mutationFn: categoriesService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries(['categories']);
		}
	});

	return { isRemovingCategory, removeCategory };
}
