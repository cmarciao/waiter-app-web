import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { User } from '@/types/Users';
import { getUserById, updateUser } from '../../action';
import { useRemoveUserModal } from '../RemoveUserModal/useRemoveUserModal';
import { useForm } from 'react-hook-form';

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

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export function useUpdateUserModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userId = searchParams.get('userId') || '';
	const {register, handleSubmit, formState: { isValid, isSubmitting, errors }} = useForm<UpdateUserSchema>({
		resolver: zodResolver(updateUserSchema)
	});

	const { handleRemoveUser, isRemovingUser } = useRemoveUserModal();

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function loadUser() {
			try {
				const response = await getUserById(userId);
				setUser(response);
			} catch(e) {
				const error = e as Error;
				toast.error(error.message);

				router.push('/users');
			}
		}

		loadUser();
	}, []);

	const handlUpdateUser: () => void = handleSubmit(async (data: UpdateUserSchema) => {
		try {
			await updateUser(userId, data);

			toast.success('User updated successfully. ✔');
		} catch(err) {
			toast.error('Error when creating user.');
		}
	});

	return {
		user,
		errors,
		isFormValid: isValid,
		isRemovingUser,
		isFormSubmitting: isSubmitting,
		register,
		handlUpdateUser,
		handleRemoveUser,
	};
}
