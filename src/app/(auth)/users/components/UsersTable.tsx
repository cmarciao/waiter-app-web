'use client';

import Image from 'next/image';

import editImage from 'public/images/edit.svg';
import trashImage from 'public/images/trash.svg';

import { Table } from '@/components/Table';
import { useUsersController } from '../useUsersController';

export function UsersTable() {
	const {users} = useUsersController();

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Users' amount={3} />

			<Table.Content>
				<Table.Head>
					<Table.Row>
						<Table.THead>Name</Table.THead>
						<Table.THead>Email</Table.THead>
						<Table.THead>Role</Table.THead>
						<Table.THead>Action</Table.THead>
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
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

		</Table.Root>
	);
}
