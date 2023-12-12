import { useFormStatus } from 'react-dom';

import { LoadScreen, Modal, ModalTitle } from '@/components';
import { Input, Button, InputGroup, InputRadio } from '@/components';

import { useUpdateUserModal } from './useUpdateUserModal';

type UpdateUserModalProps = {
	isOpen: boolean;
}

type ActionsButtonsProps = {
	onRemoveUser: () => void;
}

function ActionsButtons({ onRemoveUser }: ActionsButtonsProps) {
	const { pending } = useFormStatus();

	return (
		<footer className='mt-12 flex items-center justify-between'>
			<Button
				type='button'
				variant='secondary'
				isLoading={pending}
				onClick={onRemoveUser}
			>
				Remove user
			</Button>

			<Button
				type='submit'
				isLoading={pending}
			>
				Save changes
			</Button>
		</footer>
	);
}

export function UpdateUserModal({ isOpen }: UpdateUserModalProps) {
	if(!isOpen) return;

	const {
		user,
		state,
		formAction,
		handleRemoveUser
	} = useUpdateUserModal();

	if(!user) {
		return <LoadScreen />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/users'>
			<ModalTitle>Update user</ModalTitle>

			<form className='mt-6' action={formAction}>
				<div className='flex flex-col gap-6'>
					<Input
						name='name'
						label='Name'
						type='text'
						errorMessage={state?.name?.at(0)}
						defaultValue={user.name}
					/>

					<Input
						name='email'
						label='Email'
						type='email'
						errorMessage={state?.email?.at(0)}
						defaultValue={user.email}
					/>

					<Input
						name='password'
						label='Password'
						type='password'
						errorMessage={state?.password?.at(0)}
					/>

					<InputGroup>
						<InputRadio
							name='type'
							value="ADMIN"
							label='Admin'
							defaultChecked={user.type === 'ADMIN'}
						/>
						<InputRadio
							name='type'
							value="WAITER"
							label='Waiter'
							defaultChecked={user.type === 'WAITER'}
						/>
					</InputGroup>
				</div>

				<ActionsButtons
					onRemoveUser={handleRemoveUser}
				/>
			</form>
		</Modal>
	);
}
