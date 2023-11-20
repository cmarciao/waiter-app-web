import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { User } from '@/types/User';
import { useUpdateUser } from '@/hooks/users';
import { useRemoveUserModal } from '../RemoveUserModal/useRemoveUserModal';

const updateUserSchema = z.object({
	name: z.string({required_error: 'Name is required.'}).trim(),
	email: z.string().email('Invalid email.'),
	password:
		z.string()
			.min(8, { message:  'Min 8 characters.' })
			.nullable()
			.optional()
			.or(z.literal(''))
			.transform((value) => value === '' ? null : value),
	type: z.enum(['ADMIN', 'WAITER'])
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export function useUpdateUserModal(
	user: User,
	handleCloseModal: () => void
) {
	const { isUpdatingUser, updateUser } = useUpdateUser();
	const { isRemovingUser, handleRemoveUser: onRemoveUser } = useRemoveUserModal(handleCloseModal);

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<UpdateUserSchema>({
		resolver: zodResolver(updateUserSchema)
	});

	const handlUpdateUser = handleSubmit(async (data) => {
		try {
			const updatedUser = {
				name: data.name,
				email: data.email,
				type: data.type,
				...(data?.password && { password: data.password })
			};

			await updateUser({id: user.id!, user: updatedUser});

			toast.success('User update successfulluy. ✔');
			handleCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating user.');
		}
	});

	function handleRemoveUser() {
		onRemoveUser(user.id!);
	}

	return {
		isValid,
		isUpdatingUser,
		isRemovingUser,
		register,
		handlUpdateUser,
		handleRemoveUser,
		errors,
	};
}
