import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { useUpdateIngredientModal } from './useUpdateIngredientModal';
import { Ingredient } from '@/entities/Ingredient';

type UpdateIngredientModalProps = {
	ingredient: Ingredient;
	isOpen: boolean;
	onCloseModal: () => void;
}

export function UpdateIngredientModal({
	isOpen,
	ingredient,
	onCloseModal,
}: UpdateIngredientModalProps) {
	if(!isOpen) return;

	const {
		isValid,
		register,
		errors,
		isUpdatingIngredient,
		isRemovingIngredient,
		handleUpdateIngredient,
		handleRemoveIngredient
	} = useUpdateIngredientModal(ingredient, onCloseModal);

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Edit ingredient</ModalTitle>

			<form className='mt-6' onSubmit={handleUpdateIngredient}>
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
