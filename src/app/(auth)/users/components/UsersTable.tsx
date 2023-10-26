'use client';

import { Table } from '@/components/Table';

import { RemoveUserModal } from './RemoveUserModal';
import { useUsersController } from '../useUsersController';

import { AddUserModal } from './AddUserModal';
import { UpdateUserModal } from './UpdateUserModal';

import { PencilIcon, Trash2Icon } from 'lucide-react';

export function UsersTable() {
	const {
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
		handleRemoveUser,
	} = useUsersController();

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Users' amount={users.length}>
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
										icon={<PencilIcon />}
										onClick={() => handleOpenUpdateUserModal(user)}
									/>
									<Table.Action
										icon={<Trash2Icon color='#D73035'/>}
										onClick={() => handleOpenRemoveUserModal(user)}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			{isOpenAddUserModal && (
				<AddUserModal
					isOpen={isOpenAddUserModal}
					onAddUser={handlAddUser}
					isAddinggUser={isCreatingUser}
					onCloseModal={handleCloseAddUserModal}
				/>
			)}

			{isOpenUpdateUserModal && (
				<UpdateUserModal
					user={selectedUser!}
					isOpen={isOpenUpdateUserModal}
					onUpdateUser={handlUpdateUser}
					isUpdatingUser={isUpdatingUser}
					onRemoveUser={handleRemoveUser}
					onCloseModal={handleCloseUpdateUserModal}
				/>
			)}


			<RemoveUserModal
				user={selectedUser!}
				isOpen={isOpenRemoveUserModal}
				onRemoveUser={handleRemoveUser}
				isDeletingUser={isDeletingUser}
				onCloseModal={handleCloseRemoveUserModal}
			/>

		</Table.Root>
	);
}
