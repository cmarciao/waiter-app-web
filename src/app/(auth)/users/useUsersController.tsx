import { useQuery } from 'react-query';
import { usersService } from '@/services/usersService';

export function useUsersController() {
	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: usersService.getAll
	});
	const users = data || [];

	return {users};
}
