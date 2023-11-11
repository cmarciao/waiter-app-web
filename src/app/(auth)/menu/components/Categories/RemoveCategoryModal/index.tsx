import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { ModalDescription } from '@/components/Modal/ModalDescription';
import { Button } from '@/components/Button';
import { Category } from '@/entities/Category';

type RemoveUserModalProps = {
	category: Category;
	isOpen: boolean;
	isDeletingCategory: boolean;
	onRemoveCategory: () => Promise<void>;
	onCloseModal: () => void;
}

export function RemoveCategoryModal({
	category,
	isOpen,
	isDeletingCategory,
	onRemoveCategory,
	onCloseModal
}: RemoveUserModalProps) {
	if(!isOpen) return;

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
					isLoading={isDeletingCategory}
				>
					Keep category
				</Button>
				<Button
					onClick={onRemoveCategory}
					isLoading={isDeletingCategory}
				>
					Remove category
				</Button>
			</footer>
		</Modal>
	);
}
