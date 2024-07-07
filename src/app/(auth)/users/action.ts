'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { CreateUserSchema } from './components/CreateUserModal/useCreateUserModal';
import { UpdateUserSchema } from './components/UpdateUserModal/useUpdateUserModal';

import UserService from '@/services/UserService';

import { APIError } from '@/errors/APIError';
import { httpTags } from '@/constants/http-tags';
import { APP_ROUTES } from '@/constants/app-routes';

export async function getUserById(id: string) {
	try {
		return await UserService.getUserById(id);
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function createUser(user: CreateUserSchema) {
	try {
		await UserService.createUser(user);

		revalidateTag(httpTags.users);
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}

	redirect(APP_ROUTES.private.users);
}

export async function updateUser(id: string, user: UpdateUserSchema) {
	try {
		await UserService.updateUser(id, user);

		revalidateTag(httpTags.users);
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}

	redirect(APP_ROUTES.private.users);
}

export async function removeUser(id: string) {
	try {
		await UserService.removeUser(id);

		revalidateTag(httpTags.users);
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}

	redirect(APP_ROUTES.private.users);
}
