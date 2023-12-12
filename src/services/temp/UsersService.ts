import { User } from '@/types/User';
import { getServerSession } from 'next-auth';

export const BASE_URL = 'http://localhost:3333';

export async function getUserByIdService(id: string) {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/users/${id}`, {
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}

export async function getUsers(): Promise<User[]> {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/users`, {
		next: {
			tags: ['users']
		},
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}

export async function createUserService(user: User) {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/users`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}

export async function updateUserService(id: string, user: User) {
	const session = await getServerSession();

	const response = await fetch(`${BASE_URL}/users/${id}`, {
		method: 'PUT',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user?.name}`
		}
	});

	return response.json();
}

export async function removeUserService(id: string) {
	const session = await getServerSession();

	await fetch(`${BASE_URL}/users/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${session?.user?.name}`
		}
	});
}
