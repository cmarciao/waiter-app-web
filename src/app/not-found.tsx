import { getAccessToken } from '@/utils/user-credentials';
import { EmptyInformation } from '@/components/EmptyInformation';

export default async function NotFound() {
	const accessToken = await getAccessToken();
	const isLogged = !!accessToken;

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center justify-center gap-8'>
				<h1 className='text-[8rem] font-semibold text-gray-400' >404</h1>

				<EmptyInformation
					redirect={isLogged ? '/home' : '/signin'}
					description='Ops, esta página não existe...'
				/>
			</div>
		</div>
	);
}
