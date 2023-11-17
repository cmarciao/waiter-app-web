import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function me() {
	const me = await getServerSession(authOptions);

	return me?.user || {};
}
