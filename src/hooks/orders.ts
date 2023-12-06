import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ordersService } from '@/services/ordersService';

export const ORDER_QUERY_KEY = 'orders';

export function useGetAllOrders() {
	const { data: orders } = useQuery({
		queryKey: [ORDER_QUERY_KEY],
		queryFn: ordersService.getAll
	});

	return { orders: orders || [] };
}

export function useUpdateOrderStatus() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdatingOrderStatus, mutateAsync: updateOrderStatus } = useMutation({
		mutationFn: ordersService.update,
		onSuccess: () => {
			queryClient.invalidateQueries([ORDER_QUERY_KEY]);
		}
	});

	return {
		isUpdatingOrderStatus,
		updateOrderStatus
	};
}
