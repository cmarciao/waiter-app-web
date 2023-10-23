import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/entities/User';

const addUserSchema = z.object({
	name: z.string({required_error: 'Name is required.'}).trim(),
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' }),
	type: z.enum(['ADMIN', 'WAITER'])
});

type AddUserSchema = z.infer<typeof addUserSchema>;

export function useAddUserModalController(onAddUser: (user: User) => Promise<void>) {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<AddUserSchema>({
		resolver: zodResolver(addUserSchema)
	});

	const handleAddUser = handleSubmit(async (data) => {
		await onAddUser(data);
		reset();
	});

	return {
		register,
		isValid,
		errors,
		handleAddUser
	};
}
