import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { createUser } from '../../action';
import { useForm } from 'react-hook-form';

const createUserSchema = z.object({
	name: z.string().trim().min(1, {
		message: 'Name is required.'
	}),
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' }),
	type: z.enum(['ADMIN', 'WAITER'], { invalid_type_error: 'Choice between Admin or Waiter' })
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export function useCreateUserModal() {
	const {register, handleSubmit, formState: { isValid, isSubmitting, errors }} = useForm<CreateUserSchema>({
		resolver: zodResolver(createUserSchema)
	});

	const handleCreateUser: () => void = handleSubmit(async (data: CreateUserSchema) => {
		try {
			await createUser(data);

			toast.success('User created successfully. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	});

	return {
		errors,
		isFormValid: isValid,
		isFormSubmitting: isSubmitting,
		register,
		handleCreateUser,
	};
}
