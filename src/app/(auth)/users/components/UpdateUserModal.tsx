import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { User, UserType } from '@/entities/User';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';
import { useForm } from 'react-hook-form';
import { InputRadio } from '@/components/Checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

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

type UpdateUserSchema = {
	name: string;
	email: string;
	password: string;
	type: UserType;
}

type UpdateUserModalProps = {
	user: User;
	isOpen: boolean;
	isUpdatingUser: boolean;
	onUpdateUser: (id: string, user: User) => Promise<void>;
	onRemoveUser: (id: string) => Promise<void>;
	onCloseModal: () => void;
}

export function UpdateUserModal({
	user,
	isOpen,
	isUpdatingUser,
	onUpdateUser,
	onRemoveUser,
	onCloseModal
}: UpdateUserModalProps) {
	if(!isOpen) return null;

	const { watch, register, handleSubmit, formState: { errors, isValid }, reset, setError, clearErrors } = useForm<UpdateUserSchema>({
		resolver: zodResolver(updateUserSchema)
	});
	const watchPassword = watch('password');

	useEffect(() => {
		if(watchPassword?.length >= 1 && watchPassword?.length < 8) {
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
				passowrd: data.password
			});
		}

		await onUpdateUser(user.id!, updatedUser);
		reset();
	});

	function handleRemoveUser() {
		onRemoveUser(user.id!);
	}

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Update user</ModalTitle>

			<form className='mt-6' onSubmit={handleAddUser}>
				<div className='flex flex-col gap-6'>
					<Input
						id='name'
						label='Name'
						type='text'
						errorMessage={errors?.name?.message}
						{...register('name')}
						defaultValue={user.name}
					/>

					<Input
						id='email'
						label='Email'
						type='email'
						errorMessage={errors?.email?.message}
						{...register('email')}
						defaultValue={user.email}
					/>

					<Input
						id='password'
						label='Password'
						type='password'
						errorMessage={errors?.password?.message}
						{...register('password')}
						defaultValue={user.password}
					/>

					<div className='flex gap-8'>
						<InputRadio
							{...register('type')}
							value="ADMIN"
							label='Admin'
							defaultChecked={user.type === 'ADMIN'}
						/>
						<InputRadio
							{...register('type')}
							value="WAITER"
							label='Waiter'
							defaultChecked={user.type === 'WAITER'}
						/>
					</div>
				</div>

				<footer className='mt-12 flex justify-between'>
					<Button
						type='button'
						variant='secondary'
						isLoading={isUpdatingUser}
						onClick={handleRemoveUser}
					>
						Remove user
					</Button>

					<Button
						type='submit'
						isLoading={isUpdatingUser}
						disabled={!isValid}
					>
						Save changes
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
