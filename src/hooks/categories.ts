import { useQuery } from 'react-query';
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
