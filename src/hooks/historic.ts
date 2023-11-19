import { useMutation, useQuery, useQueryClient } from 'react-query';
import { historicService } from '@/services/historicService';
import { ordersService } from '@/services/ordersService';

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
