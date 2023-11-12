import { productsService } from '@/services/productsService';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
	const queryClient = useQueryClient();

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

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdatingProduct, mutateAsync: updateProduct } = useMutation({
		mutationFn: productsService.update,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		}
	});

	return { isUpdatingProduct, updateProduct };
}

export function useRemoveProduct() {
	const queryClient = useQueryClient();

	const { isLoading: isRemovingProduct, mutateAsync: removeProduct } = useMutation({
		mutationFn: productsService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		}
	});

	return {
		isRemovingProduct,
		removeProduct
	};
}
