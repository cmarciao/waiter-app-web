import Image from 'next/image';

import usersImage from 'public/images/users.svg';
import editImage from 'public/images/edit.svg';
import trashImage from 'public/images/trash.svg';

import { Table } from '@/components/Table';
import { User } from '@/entities/User';

const users: User[] = [
	{
		id: '0',
		name: 'Cássio Marcião',
		email: 'marciaocassio@gmail.com',
		type: 'ADMIN'
	},
	{
		id: '1',
		name: 'Neymar Júnior',
		email: 'ney@gmail.com',
		type: 'WAITER'
	},
	{
		id: '2',
		name: 'Elias Albuquerque',
		email: 'elias@gmail.com',
		type: 'ADMIN'
	}
];

export default function Users() {
	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="mt-10">
				<div className='flex items-center gap-4'>
					<Image
						width={32}
						height={32}
						src={usersImage}
						alt='Users'
					/>

					<h1>Users</h1>
				</div>

				<span className='block font-semibold mt-4'>Register and manager your users</span>
			</header>

			<main className='mt-[4.5rem]'>
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
			</main>
		</div>
	);
}
