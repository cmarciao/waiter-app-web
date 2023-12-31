import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';
import { InputRadio } from '@/components/Checkbox';
import { useCreateUserModal } from './useCreateUserModal';

type CreateUserModalProps = {
	isOpen: boolean;
	onCloseModal: () => void;
}

export function CreateUserModal({
	isOpen,
	onCloseModal
}: CreateUserModalProps) {
	if(!isOpen) return;

	const {
		isValid,
		isCreatingUser,
		register,
		errors,
		handleCreateUser
	} = useCreateUserModal(onCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>New user</ModalTitle>

			<form className='mt-6' onSubmit={handleCreateUser}>
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
							value="ADMIN"
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
					isLoading={isCreatingUser}
					disabled={!isValid}
				>
					Register new user
				</Button>
			</form>
		</Modal>
	);
}
