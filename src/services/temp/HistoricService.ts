import { Order } from '@/types/Order';
import { getServerSession } from 'next-auth';

export const BASE_URL = 'http://localhost:3333';

export async function createHistoricService() {
	const session = await getServerSession();

	const response = await fetch('${BASE_URL}/historic', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}

export async function getHistoricService(orderBy: string): Promise<Order[]> {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/historic?orderBy=${orderBy}`, {
		next: {
			tags: ['historic']
		},
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}

export async function removeHistoricService(orderBy: string): Promise<Order[]> {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/historic?orderBy=${orderBy}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}
