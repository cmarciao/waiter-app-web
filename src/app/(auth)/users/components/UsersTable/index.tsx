import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { UserModals } from '../UserModals';

import UserService from '@/services/UserService';
import { redirect } from 'next/navigation';
import { UserType } from '@/types/Users';

function formatUserTypeToPortugues(userType: UserType) {
	switch(userType) {
	case 'ADMIN': {
		return 'Administrador';
	}
			
	default: {
		return 'Garçom';
	}
	}
}

export async function UsersTable() {
	const users = await UserService.listUsers();

	if('error' in users) {
		redirect('/home');
	}

	return (
		<Table.Root className='mt-2'>
			<Table.Header title='Usuários' amount={users.length}>
				<Table.HeaderAction href='/users?openedModal=creation'>
					Novo usuário
				</Table.HeaderAction>
			</Table.Header>

			<Table.Content className='mt-4'>
				<Table.Head>
					<Table.Row>
						<Table.Th>Nome</Table.Th>
						<Table.Th>E-mail</Table.Th>
						<Table.Th>Cargo</Table.Th>
						<Table.Th>Ações</Table.Th>
					</Table.Row>
				</Table.Head>

				<Table.Body>
					{users.map((user) => (
						<Table.Row key={user.id}>
							<Table.Td>{user.name}</Table.Td>
							<Table.Td>{user.email}</Table.Td>
							<Table.Td>{formatUserTypeToPortugues(user.type)}</Table.Td>
							<Table.Td>
								<Table.Actions>
									<Table.Action
										icon={<PencilIcon color='#666' />}
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
