import Image from 'next/image';

import usersImage from 'public/images/users.svg';
import { UsersTable } from './components/UsersTable';

export default function Users() {
	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="pt-10">
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
				<UsersTable />
			</main>
		</div>
	);
}
