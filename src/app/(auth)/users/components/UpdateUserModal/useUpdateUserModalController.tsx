import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/entities/User';

const updateUserSchema = z.object({
	name: z.string({required_error: 'Name is required.'}).trim(),
	email: z.string().email('Invalid email.'),
	password:
		z.string()
			.nullable()
			.optional()
			.transform((value) => value === '' ? null : value),
	type: z.enum(['ADMIN', 'WAITER'])
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

type U = {
	user: User,
	onUpdateUser: (id: string, user: User) => Promise<void>;
	onRemoveUser: (id: string) => Promise<void>;
}

export function useUpdateUserModalController({
	user,
	onUpdateUser,
	onRemoveUser
}: U) {
	const { watch, register, handleSubmit, formState: { errors, isValid }, reset, setError, clearErrors } = useForm<UpdateUserSchema>({
		resolver: zodResolver(updateUserSchema)
	});
	const watchPassword = watch('password');

	useEffect(() => {
		if(watchPassword && watchPassword?.length < 8) {
			setError('password', {
				message: 'Min 8 characters.'
			});
		} else if(errors?.password?.message) {
			clearErrors('password');
		}
	}, [watchPassword]);

	const handleAddUser = handleSubmit(async (data) => {
		const updatedUser = {
			name: data.name,
			email: data.email,
			type: data.type,
		};

		if(data?.password) {
			Object.assign(updatedUser, {
				password: data.password
			});
		}

		await onUpdateUser(user.id!, updatedUser);
		reset();
	});

	function handleRemoveUser() {
		onRemoveUser(user.id!);
	}

	return {
		isValid,
		register,
		handleAddUser,
		handleRemoveUser,
		errors,
	};
}
