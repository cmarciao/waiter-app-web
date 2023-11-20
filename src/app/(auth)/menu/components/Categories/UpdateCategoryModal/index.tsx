import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { useUpdateCategoryModal } from './useUpdateCategoryModal';
import { Category } from '@/types/Category';

type UpdateCategoryModalProps = {
	selectedCategory: Category;
	isOpen: boolean;
	handleCloseModal: () => void;
}

export function UpdateCategoryModal({
	selectedCategory,
	isOpen,
	handleCloseModal
}: UpdateCategoryModalProps) {
	if(!isOpen) return;

	const {
		isValid,
		register,
		errors,
		isUpdatingCategory,
		isRemovingCategory,
		handleUpdateCategory,
		handleRemoveCategory
	} = useUpdateCategoryModal(selectedCategory, handleCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={handleCloseModal}>
			<ModalTitle>Edit category</ModalTitle>

			<form className='mt-6' onSubmit={handleUpdateCategory}>
				<div className='flex flex-col gap-6'>
					<Input
						id='emoji'
						label='Emoji'
						type='text'
						errorMessage={errors?.emoji?.message}
						{...register('emoji')}
						defaultValue={selectedCategory.emoji}
					/>

					<Input
						id='name'
						label='Name'
						type='text'
						errorMessage={errors?.name?.message}
						{...register('name')}
						defaultValue={selectedCategory.name}
					/>
				</div>

				<footer className='mt-12 flex justify-between'>
					<Button
						type='button'
						variant='secondary'
						isLoading={isUpdatingCategory || isRemovingCategory}
						onClick={handleRemoveCategory}
					>
						Remove category
					</Button>

					<Button
						type='submit'
						isLoading={isUpdatingCategory || isRemovingCategory}
						disabled={!isValid}
					>
						Save changes
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
