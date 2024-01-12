import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { Button } from '@/components/Button';
import { useCreateIngredientModal } from './useCreateIngredientModal';

type CreateIngredientModalProps = {
	isOpen?: boolean;
}

export function CreateIngredientModal({ isOpen = true }: CreateIngredientModalProps) {
	if(!isOpen) return;

	const {
		redirectUrl,
		errors,
		isFormValid,
		isCreatingIngredient,
		register,
		handleCreateIngredient
	} = useCreateIngredientModal();

	return (
		<Modal open={true} hrefModalClose={redirectUrl} >
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
					isLoading={isCreatingIngredient}
					onClick={handleCreateIngredient}
				>
					Create ingredient
				</Button>
			</footer>
		</Modal>
	);
}
