import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { UserModals } from '../UserModals';

import { getUsers } from '@/services/temp/UsersService';

export async function UsersTable() {
	const users = await getUsers();

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Users' amount={users.length}>
				<Table.HeaderAction href='/users?openedModal=creation'>
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
										hrefAction={`/users?openedModal=update&userId=${user.id}`}
									/>
									<Table.Action
										icon={<Trash2Icon color='#D73035'/>}
										hrefAction={`/users?openedModal=removal&userId=${user.id}`}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			<UserModals />

		</Table.Root>
	);
}
