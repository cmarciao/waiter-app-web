import { useQuery } from 'react-query';
import { historicService } from '@/services/historicService';

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
