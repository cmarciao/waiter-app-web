import { getServerSession } from 'next-auth';

export const BASE_URL = 'http://localhost:3333';

export async function getOrderByIdService(id: string) {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/orders/${id}`, {
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}
