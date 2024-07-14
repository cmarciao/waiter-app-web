import { UserIcon } from 'lucide-react';
import { UsersTable } from './components/UsersTable';

export default function Users() {
	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="pt-10">
				<div className='flex items-center gap-4'>
					<UserIcon
						width={32}
						height={32}
					/>

					<h1>Usuários</h1>
				</div>

				<span className='block font-semibold mt-4 text-gray-400'>Cadastre e gerencie seus usuários.</span>
			</header>

			<main className='mt-[4.5rem]'>
				<UsersTable />
			</main>
		</div>
	);
}
