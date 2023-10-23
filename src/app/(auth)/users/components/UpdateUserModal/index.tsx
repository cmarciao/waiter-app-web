import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { User } from '@/entities/User';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';

import { InputRadio } from '@/components/Checkbox';
import { useUpdateUserModalController } from './useUpdateUserModalController';

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

	const {
		isValid,
		register,
		handleAddUser,
		handleRemoveUser,
		errors,
	} = useUpdateUserModalController({
		user,
		onUpdateUser,
		onRemoveUser
	});

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
