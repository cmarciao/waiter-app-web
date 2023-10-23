import { usersService } from '@/services/usersService';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetAllUsers() {
	const { data: users } = useQuery({
		queryKey: ['users'],
		queryFn: usersService.getAll
	});

	return { users: users || [] };
}

export function useRemoveUser() {
	const queryClient = useQueryClient();

	const { isLoading: isDeletingUser, mutateAsync: removeUser } = useMutation({
		mutationFn: usersService.remove,
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		}
	});

	return { isDeletingUser, removeUser };
}
