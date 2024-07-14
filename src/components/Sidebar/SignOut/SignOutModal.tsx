import { Button, Modal, ModalDescription, ModalTitle } from '@/components';

type SignOutModalProps = {
	pathname: string;
	isOpen: boolean;
	isLoggingOut: boolean;
	onLogout(): void;
	onClose(): void;
}

export function SignOutModal({
	pathname,
	isOpen,
	isLoggingOut,
	onLogout,
	onClose
}: SignOutModalProps) {
	if(!isOpen) return;

	return (
		<Modal open={isOpen} hrefModalClose={pathname}>
			<ModalTitle>
				<h1>Sair da conta</h1>
			</ModalTitle>

			<ModalDescription>
				Tem certeza que deseja sair da conta?
			</ModalDescription>

			<footer className='mt-12 flex items-center justify-between gap-8'>
				<Button
					variant='secondary'
					className='flex-1'
					onClick={onClose}
					isLoading={isLoggingOut}
				>
					Cancelar
				</Button>

				<Button
					type='submit'
					className='flex-1'
					onClick={onLogout}
					isLoading={isLoggingOut}
				>
					Sair
				</Button>
			</footer>
		</Modal>
	);
}
