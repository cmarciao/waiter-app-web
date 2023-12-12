'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
	createUserService,
	getUserByIdService,
	updateUserService,
	removeUserService
} from '@/services/temp/UsersService';

const createUserSchema = z.object({
	name: z.string().trim().min(1, {
		message: 'Name is required.'
	}),
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' }),
	type: z.enum(['ADMIN', 'WAITER'], { invalid_type_error: 'Choice between Admin or Waiter' })
});

export async function getUserById(id: string) {
	const response = await getUserByIdService(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function createUser(formData: FormData) {
	const userFormData = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		type: formData.get('type'),
	};

	const validatedFields = createUserSchema.safeParse(userFormData);

	if(!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors
		};
	}

	const user = createUserSchema.parse(userFormData);
	const response = await createUserService(user);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('users');
	redirect('/users');
}

const updateUserSchema = z.object({
	name: z.string().trim().min(1, {
		message: 'Name is required.'
	}),
	email: z.string().email('Invalid email.'),
	password:
		z.string()
			.min(8, { message:  'Min 8 characters.' })
			.optional()
			.or(z.literal(''))
			.transform((value) => value === '' ? undefined : value),
	type: z.enum(['ADMIN', 'WAITER'])
});

export async function updateUser(id: string, formData: FormData) {
	const userFormData = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		type: formData.get('type'),
	};

	const validatedFields = updateUserSchema.safeParse(userFormData);

	if(!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors
		};
	}

	const userParsed = updateUserSchema.parse(userFormData);
	const user = JSON.parse(JSON.stringify(userParsed));

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
