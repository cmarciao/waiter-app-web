import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';
import { CreateCategoryParams } from '@/services/categoriesService/create';
import { useCategoryIngredientModalController } from './useAddIngredientModalController';

type AddCategoryModalProps = {
	isOpen: boolean;
	isCreatingIngredient: boolean;
	onAddCategory: (ingredient: CreateCategoryParams) => Promise<void>;
	onCloseModal: () => void;
}

export function CreateCategoryModal({
	isOpen,
	onAddCategory,
	isCreatingIngredient,
	onCloseModal
}: AddCategoryModalProps) {
	const {
		register,
		errors,
		handleCreateCategory,
		isFormValid,
	} = useCategoryIngredientModalController(onAddCategory);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Create category</ModalTitle>

			<section className='mt-6 flex flex-col gap-6'>
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
					disabled={!isFormValid}
					isLoading={isCreatingIngredient}
					onClick={handleCreateCategory}
				>
					Create ingredient
				</Button>
			</footer>
		</Modal>
	);
}
