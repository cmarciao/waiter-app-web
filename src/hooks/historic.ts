import { useMutation, useQuery, useQueryClient } from 'react-query';
import { historicService } from '@/services/historicService';
import { ordersService } from '@/services/ordersService';
import { ORDER_QUERY_KEY } from './orders';

export function useGetHistoric(orderBy: string) {
	const { data: historic, isLoading: isHistoricLoading } = useQuery({
		queryKey:['historic', orderBy],
		queryFn: () => historicService.get(orderBy),
	});

	return {
		isHistoricLoading,
		historic: historic || []
	};
}

export function useCreateHistoric() {
	const queryClient = useQueryClient();

	const {isLoading: isCreatingHistoric, mutateAsync: createHistoric} = useMutation({
		mutationFn: historicService.create,
		onSuccess: () => {
			queryClient.invalidateQueries([ORDER_QUERY_KEY]);
			queryClient.invalidateQueries(['historic']);
		}
	});

	return { isCreatingHistoric, createHistoric };
}

export function useRemoveHistoricOrder() {
	const queryClient = useQueryClient();

	const { isLoading: isRemovingHistoricOrder, mutateAsync: removeHistoricOrder } = useMutation({
		mutationFn: ordersService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries(['historic']);
		}
	});

	return { isRemovingHistoricOrder, removeHistoricOrder };
}
