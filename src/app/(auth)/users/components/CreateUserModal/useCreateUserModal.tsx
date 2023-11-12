import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useCreateUser } from '@/hooks/users';

const createUserSchema = z.object({
	name: z.string({required_error: 'Name is required.'}).trim(),
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' }),
	type: z.enum(['ADMIN', 'WAITER'])
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export function useCreateUserModal(handleCloseCreateUserModal: () => void) {
	const { isCreatingUser, createUser } = useCreateUser();
	const { register, handleSubmit, formState: { errors, isValid }} = useForm<CreateUserSchema>({
		resolver: zodResolver(createUserSchema)
	});

	const handleCreateUser = handleSubmit(async (data) => {
		try {
			await createUser(data);

			toast.success('User created successfulluy. ✔');
			handleCloseCreateUserModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating user.');
		}
	});

	return {
		isCreatingUser,
		register,
		isValid,
		errors,
		handleCreateUser
	};
}
