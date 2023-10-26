import { productsService } from '@/services/productsService';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetAllProducts() {
	const { data } = useQuery({
		queryKey: ['products'],
		queryFn: productsService.getAll
	});

	return {
		products: data || []
	};
}

export function useCreateProduct() {
	const queryClient = new QueryClient();

	const { isLoading: isCreatingProduct, mutateAsync: createProduct } = useMutation({
		mutationFn: productsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		}
	});

	return {
		isCreatingProduct,
		createProduct
	};
}

export function useRemoveProduct() {
	const queryClient = useQueryClient();

	const { isLoading: isDeletingProduct, mutateAsync: removeProduct } = useMutation({
		mutationFn: productsService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		}
	});

	return {
		isDeletingProduct,
		removeProduct
	};
}
