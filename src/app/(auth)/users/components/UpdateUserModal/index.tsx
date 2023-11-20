import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { User } from '@/types/User';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';

import { InputRadio } from '@/components/Checkbox';
import { useUpdateUserModal } from './useUpdateUserModal';

type UpdateUserModalProps = {
	user: User;
	isOpen: boolean;
	onCloseModal: () => void;
}

export function UpdateUserModal({
	user,
	isOpen,
	onCloseModal
}: UpdateUserModalProps) {
	if(!isOpen) return;

	const {
		isValid,
		isRemovingUser,
		isUpdatingUser,
		errors,
		register,
		handlUpdateUser,
		handleRemoveUser
	} = useUpdateUserModal(
		user,
		onCloseModal,
	);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Update user</ModalTitle>

			<form className='mt-6' onSubmit={handlUpdateUser}>
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
						isLoading={isUpdatingUser || isRemovingUser}
						onClick={handleRemoveUser}
					>
						Remove user
					</Button>

					<Button
						type='submit'
						isLoading={isUpdatingUser || isRemovingUser}
						disabled={!isValid}
					>
						Save changes
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
