'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import UserService from '@/services/UserService';
import { CreateUserSchema } from './components/CreateUserModal/useCreateUserModal';
import { UpdateUserSchema } from './components/UpdateUserModal/useUpdateUserModal';

export async function getUserById(id: string) {
	const response = await UserService.getUserById(id);

	if('error' in response) {
		throw new Error(response.message);
	}

	return response;
}

export async function createUser(user: CreateUserSchema) {
	const response = await UserService.createUser(user);

	if('error' in response) {
		throw new Error(response.message);
	}

	revalidateTag('users');
	redirect('/users');
}

export async function updateUser(id: string, user: UpdateUserSchema) {
	const response = await UserService.updateUser(id, user);

	if('error' in response) {
		throw new Error(response.message);
	}

	revalidateTag('users');
	redirect('/users');
}


export async function removeUser(id: string) {
	await UserService.removeUser(id);

	revalidateTag('users');
	redirect('/users');
}
