import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { User, UserType } from '@/entities/User';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';
import { useForm } from 'react-hook-form';
import { InputRadio } from '@/components/Checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addUserSchema = z.object({
	name: z.string({required_error: 'Name is required.'}).trim(),
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' }),
	type: z.enum(['ADMIN', 'WAITER'])
});

type AddUserSchema = {
	name: string;
	email: string;
	password: string;
	type: UserType;
}

type AddUserModalProps = {
	isOpen: boolean;
	isAddinggUser: boolean;
	onAddUser: (user: User) => Promise<void>;
	onCloseModal: () => void;
}

export function AddUserModal({
	isOpen,
	isAddinggUser,
	onAddUser,
	onCloseModal
}: AddUserModalProps) {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<AddUserSchema>({
		resolver: zodResolver(addUserSchema)
	});

	const handleAddUser = handleSubmit(async (data) => {
		await onAddUser(data);
		reset();
	});

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>New user</ModalTitle>

			<form className='mt-6' onSubmit={handleAddUser}>
				<div className='flex flex-col gap-6'>
					<Input
						id='name'
						label='Name'
						type='text'
						errorMessage={errors?.name?.message}
						{...register('name')}
					/>

					<Input
						id='email'
						label='Email'
						type='email'
						errorMessage={errors?.email?.message}
						{...register('email')}
					/>

					<Input
						id='password'
						label='Password'
						type='password'
						errorMessage={errors?.password?.message}
						{...register('password')}
					/>

					<div className='flex gap-8'>
						<InputRadio
							{...register('type')}
							value="WAITER"
							label='Admin'
						/>
						<InputRadio
							{...register('type')}
							value="WAITER"
							label='Waiter'
						/>
					</div>
				</div>

				<Button
					type='submit'
					className='w-full mt-12'
					isLoading={isAddinggUser}
					disabled={!isValid}
				>
					Register new user
				</Button>
			</form>
		</Modal>
	);
}
