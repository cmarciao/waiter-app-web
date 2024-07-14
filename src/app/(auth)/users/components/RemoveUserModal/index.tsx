import Link from 'next/link';
import { useFormStatus } from 'react-dom';

import { Input, Button } from '@/components';
import { LoadScreen } from '@/components/LoadScreen';
import { Modal, ModalTitle, ModalDescription } from '@/components';

import { useRemoveUserModal } from './useRemoveUserModal';

type RemoveUserModalProps = {
	isOpen: boolean;
}

function ActionsButtons() {
	const { pending } = useFormStatus();

	return (
		<footer className='mt-12 flex items-center justify-between'>
			<Button
				variant='secondary'
				isLoading={pending}
			>
				<Link href='/users'>
					Cancelar
				</Link>
			</Button>

			<Button
				type='submit'
				isLoading={pending}
			>
				Excluir usuário
			</Button>
		</footer>
	);
}

export function RemoveUserModal({ isOpen }: RemoveUserModalProps) {
	if(!isOpen) return null;

	const {
		user,
		formAction
	} = useRemoveUserModal();

	if(!user) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/users'>
			<ModalTitle>Excluir usuário</ModalTitle>
			<ModalDescription>Tem certeza que deseja excluir o usuário?</ModalDescription>

			<form className='mt-6 flex flex-col gap-6' action={formAction}>
				<Input
					label='Nome'
					type='text'
					value={user.name}
					disabled
				/>

				<Input
					label='E-mail'
					type='email'
					value={user.email}
					disabled
				/>

				<ActionsButtons />
			</form>
		</Modal>
	);
}
