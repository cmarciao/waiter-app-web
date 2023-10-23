import { useState } from 'react';
import toast from 'react-hot-toast';

import { User } from '@/entities/User';
import { useCreateUser, useGetAllUsers, useRemoveUser } from '@/hooks/users';

export function useUsersController() {
	const [selectedUser, setSelectedUser] = useState<User>({} as User);
	const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
	const [isOpenRemoveUserModal, setIsOpenRemoveUserModal] = useState(false);

	const { users } = useGetAllUsers();
	const { isDeletingUser, removeUser } = useRemoveUser();
	const { isCreatingUser, createUser } = useCreateUser();


	function handleOpenRemoveUserModal(user: User) {
		setSelectedUser(user);
		setIsOpenRemoveUserModal(true);
	}

	function handleCloseRemoveUserModal() {
		setIsOpenRemoveUserModal(false);
	}

	function handleOpenAddUserModal() {
		setIsOpenAddUserModal(true);
	}

	function handleCloseAddUserModal() {
		setIsOpenAddUserModal(false);
	}

	async function handlAddUser(user: User) {
		try {
			await createUser(user);

			toast.success('User created successfulluy. ✔');
			handleCloseAddUserModal();
		} catch {
			toast.error('Error when creating user.');
		}
	}

	async function handleRemoveUser(id: string) {
		try {
			await removeUser(id);

			toast.success('User deleted successfulluy. ✔');
			handleCloseRemoveUserModal();
		} catch {
			toast.error('Error when deleting user.');
		}
	}

	return {
		users,
		isOpenAddUserModal,
		isOpenRemoveUserModal,
		selectedUser,
		isCreatingUser,
		isDeletingUser,
		handleOpenRemoveUserModal,
		handleCloseRemoveUserModal,
		handleOpenAddUserModal,
		handleCloseAddUserModal,
		handlAddUser,
		handleRemoveUser
	};
}
