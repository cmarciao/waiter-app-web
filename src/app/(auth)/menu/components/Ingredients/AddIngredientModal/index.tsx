import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';
import { useAddIngredientModalController } from './useAddIngredientModalController';
import { CreateIngredientParam } from '@/services/ingredientsService/create';

type AddIngredientModalProps = {
	isOpen: boolean;
	isAddingIngredient: boolean;
	onAddIngredient: (ingredient: CreateIngredientParam) => Promise<void>;
	onCloseModal: () => void;
}

export function AddIngredientModal({
	isOpen,
	onAddIngredient,
	isAddingIngredient,
	onCloseModal
}: AddIngredientModalProps) {
	const {
		register,
		errors,
		handleAddIngredient,
		isFormValid,
	} = useAddIngredientModalController(onAddIngredient);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Create Ingredient</ModalTitle>

			<section className='mt-6 flex flex-col gap-6'>
				<Input
					label='Emoji'
					type='text'
					placeholder='Ex: 🍅'
					{...register('emoji')}
					errorMessage={errors?.emoji?.message}
				/>

				<Input
					label='Name'
					type='text'
					placeholder='Ex: Tomato'
					{...register('name')}
					errorMessage={errors?.name?.message}
				/>
			</section>

			<footer className='mt-12 text-right'>
				<Button
					disabled={!isFormValid}
					isLoading={isAddingIngredient}
					onClick={handleAddIngredient}
				>
					Create ingredient
				</Button>
			</footer>
		</Modal>
	);
}
