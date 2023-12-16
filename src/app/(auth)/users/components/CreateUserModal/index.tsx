import { Button } from '@/components/Button';
import { Modal, ModalTitle } from '@/components';
import { Input, InputRadio, InputGroup } from '@/components';

import { useCreateUserModal } from './useCreateUserModal';

type CreateUserModalProps = {
	isOpen: boolean;
}

export function CreateUserModal({ isOpen }: CreateUserModalProps) {
	if(!isOpen) return;

	const {
		register,
		errors,
		isFormValid,
		isFormSubmitting,
		handleCreateUser
	} = useCreateUserModal();

	return (
		<Modal open={isOpen} hrefModalClose='/users'>
			<ModalTitle>New user</ModalTitle>

			<form className='mt-6' action={handleCreateUser} >
				<div className='flex flex-col gap-6'>
					<Input
						label='Name'
						type='text'
						{...register('name')}
						errorMessage={errors?.name?.message}
					/>

					<Input
						label='Email'
						type='email'
						{...register('email')}
						errorMessage={errors?.email?.message}
					/>

					<Input
						label='Password'
						type='password'
						{...register('password')}
						errorMessage={errors?.password?.message}
					/>

					<InputGroup errorMessage={errors?.type?.message}>
						<InputRadio
							value="ADMIN"
							label='Admin'
							{...register('type')}
						/>
						<InputRadio
							value="WAITER"
							label='Waiter'
							{...register('type')}
						/>
					</InputGroup>
				</div>

				<footer className='mt-12'>
					<Button
						className='w-full'
						type='submit'
						disabled={!isFormValid}
						isLoading={isFormSubmitting}
					>
						Register new user
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
