import { useState } from 'react';

import { User } from '@/entities/User';
import { useGetAllUsers } from '@/hooks/users';

export function useUsersController() {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
	const [isOpenUpdateUserModal, setIsOpenUpdateUserModal] = useState(false);
	const [isOpenRemoveUserModal, setIsOpenRemoveUserModal] = useState(false);

	const { users } = useGetAllUsers();

	function handleOpenCreateUserModal() {
		setIsOpenCreateUserModal(true);
	}

	function handleCloseCreateUserModal() {
		setIsOpenCreateUserModal(false);
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

	function closeModalWhenRemoveUser() {
		if(isOpenUpdateUserModal) handleCloseUpdateUserModal();
		handleCloseRemoveUserModal();
	}

	return {
		users,
		selectedUser,
		isOpenCreateUserModal,
		isOpenUpdateUserModal,
		isOpenRemoveUserModal,
		handleOpenCreateUserModal,
		handleCloseCreateUserModal,
		handleOpenUpdateUserModal,
		handleCloseUpdateUserModal,
		handleOpenRemoveUserModal,
		handleCloseRemoveUserModal,
		closeModalWhenRemoveUser
	};
}
