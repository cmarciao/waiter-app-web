import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { User } from '@/entities/User';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { ModalDescription } from '@/components/Modal/ModalDescription';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';

type RemoveUserModalProps = {
	user: User;
	isOpen: boolean;
	isDeletingUser: boolean;
	onRemoveUser: (id: string) => Promise<void>;
	onCloseModal: () => void;
}

export function RemoveUserModal({
	user,
	isOpen,
	isDeletingUser,
	onRemoveUser,
	onCloseModal
}: RemoveUserModalProps) {
	async function handleRemoveUser() {
		try {
			await onRemoveUser(user.id);

			toast.success('User deleted successfulluy. ✔');
			onCloseModal();
		} catch {
			toast.error('Error when deleting user.');
		}
	}

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
					isLoading={isDeletingUser}
				>
					Keep user
				</Button>
				<Button
					onClick={handleRemoveUser}
					isLoading={isDeletingUser}
				>
					Remove user
				</Button>
			</footer>
		</Modal>
	);
}
