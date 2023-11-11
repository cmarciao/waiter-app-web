import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { useUpdateCategoryModalController } from './useUpdateCategoryModalController';
import { Category } from '@/entities/Category';

type UpdateCategoryModalProps = {
	selectedCategory: Category;
	isOpenEditCategoryModal: boolean;
	handleUpdateCategory: (category: Category) => void
	handleCloseEdictCategoryModal: () => void;
	isUpdatingCategory: boolean;
	isRemovingCategory: boolean;
	handleRemoveCategory: () => void;
}

export function UpdateCategoryModal({
	selectedCategory,
	handleUpdateCategory,
	isOpenEditCategoryModal,
	handleCloseEdictCategoryModal,
	handleRemoveCategory,
	isRemovingCategory,
	isUpdatingCategory
}: UpdateCategoryModalProps) {
	const {
		onUpdateCategory,
		isValid,
		register,
		errors
	} = useUpdateCategoryModalController(selectedCategory, handleUpdateCategory);

	return (
		<Modal open={isOpenEditCategoryModal} onCloseModal={handleCloseEdictCategoryModal}>
			<ModalTitle>Edit category</ModalTitle>

			<form className='mt-6' onSubmit={onUpdateCategory}>
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
