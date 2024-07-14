import { LoadScreen } from '@/components';
import { Input, Button } from '@/components';
import { Modal, ModalTitle, ModalDescription } from '@/components';

import { useRemoveCategoryModal } from './useRemoveCategoryModal';
import Link from 'next/link';

type RemoveUserModalProps = {
	isOpen: boolean;
}

export function RemoveCategoryModal({ isOpen }: RemoveUserModalProps) {
	if(!isOpen) return;

	const {
		category,
		isRemovingCategory,
		formAction
	} = useRemoveCategoryModal();

	if(!category) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=categories'>
			<ModalTitle>Excluir categoria</ModalTitle>
			<ModalDescription>Tem certeza que deseja excluir a categoria?</ModalDescription>

			<form action={formAction}>
				<section className='mt-6 flex flex-col gap-6'>
					<Input
						label='Emoji'
						type='text'
						value={category.emoji}
						disabled
					/>

					<Input
						label='Nome'
						type='text'
						value={category.name}
						disabled
					/>
				</section>

				<footer className='mt-12 flex items-center justify-between'>
					<Link href='/menu?tab=categories'>
						<Button
							type='button'
							variant='secondary'
							isLoading={isRemovingCategory}
						>
							Cancelar
						</Button>
					</Link>

					<Button
						type='submit'
						isLoading={isRemovingCategory}
					>
						Excluir categoria
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
