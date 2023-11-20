import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { User } from '@/types/User';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { ModalDescription } from '@/components/Modal/ModalDescription';
import { Button } from '@/components/Button';
import { useRemoveUserModal } from './useRemoveUserModal';

type RemoveUserModalProps = {
	user: User;
	isOpen: boolean;
	onCloseModal: () => void;
}

export function RemoveUserModal({
	user,
	isOpen,
	onCloseModal
}: RemoveUserModalProps) {
	if(!isOpen) return;

	const {
		isRemovingUser,
		handleRemoveUser
	} = useRemoveUserModal(onCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Remove user</ModalTitle>
			<ModalDescription>Tem certeza que deseja excluir o usuário?</ModalDescription>

			<section className='mt-6 flex flex-col gap-6'>
				<Input
					label='Name'
					type='text'
					value={user.name}
					disabled
				/>

				<Input
					label='Email'
					type='email'
					value={user.email}
					disabled
				/>
			</section>

			<footer className='mt-12 flex items-center justify-between'>
				<Button
					variant='secondary'
					onClick={onCloseModal}
					isLoading={isRemovingUser}
				>
					Keep user
				</Button>
				<Button
					onClick={() => handleRemoveUser(user.id!)}
					isLoading={isRemovingUser}
				>
					Remove user
				</Button>
			</footer>
		</Modal>
	);
}
