import { Category } from '@/entities/Category';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { ModalDescription } from '@/components/Modal/ModalDescription';

import { useRemoveCategoryModal } from './useRemoveCategoryModal';

type RemoveUserModalProps = {
	category: Category;
	isOpen: boolean;
	onCloseModal: () => void;
}

export function RemoveCategoryModal({
	category,
	isOpen,
	onCloseModal
}: RemoveUserModalProps) {
	if(!isOpen) return;

	const { isRemovingCategory, handleRemoveCategory } = useRemoveCategoryModal(category, onCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Remove category</ModalTitle>
			<ModalDescription>Are you sure you want to remove this category?</ModalDescription>

			<section className='mt-6 flex flex-col gap-6'>
				<Input
					label='Emoji'
					type='text'
					value={category.emoji}
					disabled
				/>

				<Input
					label='Name'
					type='text'
					value={category.name}
					disabled
				/>
			</section>

			<footer className='mt-12 flex items-center justify-between'>
				<Button
					variant='secondary'
					onClick={onCloseModal}
					isLoading={isRemovingCategory}
				>
					Keep category
				</Button>
				<Button
					onClick={handleRemoveCategory}
					isLoading={isRemovingCategory}
				>
					Remove category
				</Button>
			</footer>
		</Modal>
	);
}
