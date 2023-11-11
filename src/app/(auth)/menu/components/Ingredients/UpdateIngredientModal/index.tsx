import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { useUpdateIngredientModalController } from './useUpdateIngredientModalController';
import { Ingredient } from '@/entities/Ingredient';

type UpdateIngredientModalProps = {
	ingredient: Ingredient;
	isOpen: boolean;
	handleUpdateIngredient: (ingredient: Ingredient) => void
	handleCloseModal: () => void;
	isUpdatingIngredient: boolean;
	isRemovingIngredient: boolean;
	handleRemoveIngredient: () => void;
}

export function UpdateIngredientModal({
	ingredient,
	isOpen,
	handleUpdateIngredient,
	handleCloseModal,
	isUpdatingIngredient,
	isRemovingIngredient,
	handleRemoveIngredient
}: UpdateIngredientModalProps) {
	const {
		onUpdateIngredient,
		isValid,
		register,
		errors
	} = useUpdateIngredientModalController(ingredient, handleUpdateIngredient);

	return (
		<Modal open={isOpen} onCloseModal={handleCloseModal}>
			<ModalTitle>Edit ingredient</ModalTitle>

			<form className='mt-6' onSubmit={onUpdateIngredient}>
				<div className='flex flex-col gap-6'>
					<Input
						id='emoji'
						label='Emoji'
						type='text'
						errorMessage={errors?.emoji?.message}
						{...register('emoji')}
						defaultValue={ingredient?.emoji}
					/>

					<Input
						id='name'
						label='Name'
						type='text'
						errorMessage={errors?.name?.message}
						{...register('name')}
						defaultValue={ingredient?.name}
					/>
				</div>

				<footer className='mt-12 flex justify-between'>
					<Button
						type='button'
						variant='secondary'
						isLoading={isUpdatingIngredient || isRemovingIngredient}
						onClick={handleRemoveIngredient}
					>
						Remove ingredient
					</Button>

					<Button
						type='submit'
						isLoading={isUpdatingIngredient || isRemovingIngredient}
						disabled={!isValid}
					>
						Save changes
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
