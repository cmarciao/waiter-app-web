'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateUserSchema } from './components/CreateUserModal/useCreateUserModal';
import { UpdateUserSchema } from './components/UpdateUserModal/useUpdateUserModal';

import UserService from '@/services/UserService';

import { httpTags } from '@/constants/http-tags';
import { APP_ROUTES } from '@/constants/app-routes';

export async function getUserById(id: string) {
	return await UserService.getUserById(id);
}

export async function createUser(user: CreateUserSchema) {
	await UserService.createUser(user);

	revalidateTag(httpTags.users);	
	redirect(APP_ROUTES.private.users);
}

export async function updateUser(id: string, user: UpdateUserSchema) {
	await UserService.updateUser(id, user);

	revalidateTag(httpTags.users);
	redirect(APP_ROUTES.private.users);
}

export async function removeUser(id: string) {
	await UserService.removeUser(id);

	revalidateTag(httpTags.users);
	redirect(APP_ROUTES.private.users);
}
