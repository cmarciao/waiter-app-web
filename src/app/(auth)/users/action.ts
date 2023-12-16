'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import {
	createUserService,
	getUserByIdService,
	updateUserService,
	removeUserService
} from '@/services/temp/UsersService';
import { CreateUserSchema } from './components/CreateUserModal/useCreateUserModal';
import { UpdateUserSchema } from './components/UpdateUserModal/useUpdateUserModal';

export async function getUserById(id: string) {
	const response = await getUserByIdService(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function createUser(user: CreateUserSchema) {
	const response = await createUserService(user);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('users');
	redirect('/users');
}

export async function updateUser(id: string, user: UpdateUserSchema) {
	const response = await updateUserService(id, user);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('users');
	redirect('/users');
}


export async function removeUser(id: string) {
	await removeUserService(id);

	revalidateTag('users');
	redirect('/users');
}
