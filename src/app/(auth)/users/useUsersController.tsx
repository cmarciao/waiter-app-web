import { useState } from 'react';
import toast from 'react-hot-toast';

import { User } from '@/entities/User';
import { useCreateUser, useGetAllUsers, useRemoveUser, useUpdateUser } from '@/hooks/users';
import axios from 'axios';

export function useUsersController() {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
	const [isOpenUpdateUserModal, setIsOpenUpdateUserModal] = useState(false);
	const [isOpenRemoveUserModal, setIsOpenRemoveUserModal] = useState(false);

	const { users } = useGetAllUsers();
	const { isCreatingUser, createUser } = useCreateUser();
	const { isUpdatingUser, updateUser } = useUpdateUser();
	const { isDeletingUser, removeUser } = useRemoveUser();

	function handleOpenAddUserModal() {
		setIsOpenAddUserModal(true);
	}

	function handleCloseAddUserModal() {
		setIsOpenAddUserModal(false);
	}

	function handleOpenUpdateUserModal(user: User) {
		setSelectedUser(user);
		setIsOpenUpdateUserModal(true);
	}

	function handleCloseUpdateUserModal() {
		setSelectedUser(null);
		setIsOpenUpdateUserModal(false);
	}

	function handleOpenRemoveUserModal(user: User) {
		setSelectedUser(user);
		setIsOpenRemoveUserModal(true);
	}

	function handleCloseRemoveUserModal() {
		setSelectedUser(null);
		setIsOpenRemoveUserModal(false);
	}

	async function handlAddUser(user: User) {
		try {
			await createUser(user);

			toast.success('User created successfulluy. ✔');
			handleCloseAddUserModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating user.');
		}
	}

	async function handlUpdateUser(id: string, user: Partial<User>) {
		try {
			await updateUser({id, user});

			toast.success('User update successfulluy. ✔');
			handleCloseUpdateUserModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating user.');
		}
	}

	async function handleRemoveUser(id: string) {
		try {
			await removeUser(id);

			toast.success('User deleted successfulluy. ✔');

			if(isOpenRemoveUserModal) handleCloseRemoveUserModal();
			else handleCloseUpdateUserModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting user.');
		}
	}

	return {
		users,
		selectedUser,
		isOpenAddUserModal,
		isOpenUpdateUserModal,
		isOpenRemoveUserModal,
		isCreatingUser,
		isUpdatingUser,
		isDeletingUser,
		handleOpenAddUserModal,
		handleCloseAddUserModal,
		handleOpenUpdateUserModal,
		handleCloseUpdateUserModal,
		handleOpenRemoveUserModal,
		handleCloseRemoveUserModal,
		handlAddUser,
		handlUpdateUser,
		handleRemoveUser
	};
}
