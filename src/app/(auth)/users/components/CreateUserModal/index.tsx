import { useFormStatus } from 'react-dom';

import { Button } from '@/components/Button';
import { Modal, ModalTitle } from '@/components';
import { Input, InputRadio, InputGroup } from '@/components';

import { useCreateUserModal } from './useCreateUserModal';

type CreateUserModalProps = {
	isOpen: boolean;
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			className='w-full mt-12'
			isLoading={pending}
		>
			Register new user
		</Button>
	);
}

export function CreateUserModal({ isOpen }: CreateUserModalProps) {
	if(!isOpen) return;

	const { state, formAction } = useCreateUserModal();

	return (
		<Modal open={isOpen} hrefModalClose='/users'>
			<ModalTitle>New user</ModalTitle>

			<form className='mt-6' action={formAction} >
				<div className='flex flex-col gap-6'>
					<Input
						name='name'
						label='Name'
						type='text'
						errorMessage={state?.name?.at(0)}
					/>

					<Input
						name='email'
						label='Email'
						type='email'
						errorMessage={state?.email?.at(0)}
					/>

					<Input
						name='password'
						label='Password'
						type='password'
						errorMessage={state?.password?.at(0)}
					/>

					<InputGroup errorMessage={state?.type?.at(0)}>
						<InputRadio
							name='type'
							value="ADMIN"
							label='Admin'
						/>
						<InputRadio
							name='type'
							value="WAITER"
							label='Waiter'
						/>
					</InputGroup>
				</div>

				<SubmitButton />
			</form>
		</Modal>
	);
}
