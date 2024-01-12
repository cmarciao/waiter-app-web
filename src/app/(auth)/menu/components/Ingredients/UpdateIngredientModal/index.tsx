import { Input, Button, LoadScreen } from '@/components';
import { Modal, ModalTitle } from '@/components';

import { useUpdateIngredientModal } from './useUpdateIngredientModal';

type UpdateIngredientModalProps = {
	isOpen: boolean;
}

export function UpdateIngredientModal({ isOpen }: UpdateIngredientModalProps) {
	if(!isOpen) return;

	const {
		ingredient,
		isValid,
		errors,
		isUpdatingIngredient,
		isRemovingIngredient,
		register,
		handleUpdateIngredient,
		handleRemoveIngredient
	} = useUpdateIngredientModal();

	if(!ingredient) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=ingredients'>
			<ModalTitle>Edit ingredient</ModalTitle>

			<form className='mt-6' action={handleUpdateIngredient}>
				<div className='flex flex-col gap-6'>
					<Input
						id='emoji'
						label='Emoji'
						type='text'
						errorMessage={errors?.emoji?.message}
						{...register('emoji')}
						defaultValue={ingredient.emoji}
					/>

					<Input
						id='name'
						label='Name'
						type='text'
						errorMessage={errors?.name?.message}
						{...register('name')}
						defaultValue={ingredient.name}
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
