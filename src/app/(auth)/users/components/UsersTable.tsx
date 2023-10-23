'use client';

import Image from 'next/image';
import { Table } from '@/components/Table';

import { RemoveUserModal } from './RemoveUserModal';
import { useUsersController } from '../useUsersController';

import editImage from 'public/images/edit.svg';
import trashImage from 'public/images/trash.svg';
import { AddUserModal } from './AddUserModal';

export function UsersTable() {
	const {
		users,
		selectedUser,
		isOpenAddUserModal,
		isOpenRemoveUserModal,
		isCreatingUser,
		isDeletingUser,
		handleOpenRemoveUserModal,
		handleCloseRemoveUserModal,
		handleOpenAddUserModal,
		handleCloseAddUserModal,
		handlAddUser,
		handleRemoveUser,
	} = useUsersController();

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Users' amount={3}>
				<Table.HeaderAction onClick={handleOpenAddUserModal}>
					New user
				</Table.HeaderAction>
			</Table.Header>

			<Table.Content>
				<Table.Head>
					<Table.Row>
						<Table.Th>Name</Table.Th>
						<Table.Th>Email</Table.Th>
						<Table.Th>Role</Table.Th>
						<Table.Th>Action</Table.Th>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{users.map((user) => (
						<Table.Row key={user.id}>
							<Table.Td>{user.name}</Table.Td>
							<Table.Td>{user.email}</Table.Td>
							<Table.Td>{user.type}</Table.Td>
							<Table.Td>
								<Table.Actions>
									<Table.Action
										icon={<Image src={editImage} alt='Edit user'/>}
									/>
									<Table.Action
										icon={<Image src={trashImage} alt='Remove user'/>}
										onClick={() => handleOpenRemoveUserModal(user)}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			<AddUserModal
				isOpen={isOpenAddUserModal}
				onAddUser={handlAddUser}
				isAddinggUser={isCreatingUser}
				onCloseModal={handleCloseAddUserModal}
			/>

			<RemoveUserModal
				user={selectedUser}
				isOpen={isOpenRemoveUserModal}
				onRemoveUser={handleRemoveUser}
				isDeletingUser={isDeletingUser}
				onCloseModal={handleCloseRemoveUserModal}
			/>
		</Table.Root>
	);
}
