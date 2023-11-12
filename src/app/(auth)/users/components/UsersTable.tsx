'use client';

import { Table } from '@/components/Table';

import { RemoveUserModal } from './RemoveUserModal';
import { useUsersController } from '../useUsersController';

import { CreateUserModal } from './CreateUserModal';
import { UpdateUserModal } from './UpdateUserModal';

import { PencilIcon, Trash2Icon } from 'lucide-react';

export function UsersTable() {
	const {
		users,
		selectedUser,
		isOpenCreateUserModal,
		isOpenUpdateUserModal,
		isOpenRemoveUserModal,
		isUpdatingUser,
		isDeletingUser,
		handleOpenCreateUserModal,
		handleCloseCreateUserModal,
		handleOpenUpdateUserModal,
		handleCloseUpdateUserModal,
		handleOpenRemoveUserModal,
		handleCloseRemoveUserModal,
		handlUpdateUser,
		handleRemoveUser,
	} = useUsersController();

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Users' amount={users.length}>
				<Table.HeaderAction onClick={handleOpenCreateUserModal}>
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

			<CreateUserModal
				isOpen={isOpenCreateUserModal}
				onCloseModal={handleCloseCreateUserModal}
			/>

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
