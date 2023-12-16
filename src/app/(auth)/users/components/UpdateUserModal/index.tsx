import { LoadScreen, Modal, ModalTitle } from '@/components';
import { Input, Button, InputGroup, InputRadio } from '@/components';

import { useUpdateUserModal } from './useUpdateUserModal';

type UpdateUserModalProps = {
	isOpen: boolean;
}

export function UpdateUserModal({ isOpen }: UpdateUserModalProps) {
	if(!isOpen) return;

	const {
		user,
		errors,
		isFormValid,
		isRemovingUser,
		isFormSubmitting,
		register,
		handlUpdateUser,
		handleRemoveUser,
	} = useUpdateUserModal();

	if(!user) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/users'>
			<ModalTitle>Update user</ModalTitle>

			<form className='mt-6' action={handlUpdateUser}>
				<div className='flex flex-col gap-6'>
					<Input
						label='Name'
						type='text'
						defaultValue={user.name}
						errorMessage={errors?.name?.message}
						{...register('name')}
					/>

					<Input
						label='Email'
						type='email'
						defaultValue={user.email}
						errorMessage={errors?.email?.message}
						{...register('email')}
					/>

					<Input
						label='Password'
						type='password'
						errorMessage={errors?.password?.message}
						{...register('password')}
					/>

					<InputGroup>
						<InputRadio
							value="ADMIN"
							label='Admin'
							defaultChecked={user.type === 'ADMIN'}
							{...register('type')}
						/>
						<InputRadio
							value="WAITER"
							label='Waiter'
							defaultChecked={user.type === 'WAITER'}
							{...register('type')}
						/>
					</InputGroup>
				</div>

				<footer className='mt-12 flex items-center justify-between'>
					<Button
						type='button'
						variant='secondary'
						isLoading={isRemovingUser}
						onClick={handleRemoveUser}
					>
						Remove user
					</Button>

					<Button
						type='submit'
						disabled={!isFormValid}
						isLoading={isFormSubmitting || isRemovingUser}
					>
						Save changes
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
