import { Input, Button } from '@/components';
import { Modal, ModalTitle } from '@/components/';

import { useCreateCategoryModal } from './useCreateCategoryModal';

type AddCategoryModalProps = {
	isOpen: boolean;
}

export function CreateCategoryModal({
	isOpen
}: AddCategoryModalProps) {
	if(!isOpen) return;

	const {
		register,
		isFormValid,
		errors,
		isCreatingCategory,
		handleCreateCategory,
	} = useCreateCategoryModal();

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=categories'>
			<ModalTitle>Create category</ModalTitle>

			<form action={handleCreateCategory} className='mt-6'>
				<section className='flex flex-col gap-6'>
					<Input
						label='Emoji'
						type='text'
						placeholder='Ex: 🍕'
						{...register('emoji')}
						errorMessage={errors?.emoji?.message}
					/>

					<Input
						label='Name'
						type='text'
						placeholder='Ex: Pizza'
						{...register('name')}
						errorMessage={errors?.name?.message}
					/>
				</section>

				<footer className='mt-12 text-right'>
					<Button
						type='submit'
						disabled={!isFormValid}
						isLoading={isCreatingCategory}
					>
						Create ingredient
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
