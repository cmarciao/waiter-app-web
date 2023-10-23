import { useGetAllUsers, useRemoveUser } from '@/hooks/users';

export function useUsersController() {
	const { users } = useGetAllUsers();
	const { removeUser, isDeletingUser } = useRemoveUser();

	async function handleRemoveUser(id: string) {
		await removeUser(id);
	}

	return {
		users,
		handleRemoveUser,
		isDeletingUser
	};
}
