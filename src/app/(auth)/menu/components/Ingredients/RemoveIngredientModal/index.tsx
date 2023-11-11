import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { ModalTitle } from '@/components/Modal/ModalTitle';
import { ModalDescription } from '@/components/Modal/ModalDescription';
import { Button } from '@/components/Button';
import { Ingredient } from '@/entities/Ingredient';

type RemoveIngredientModalProps = {
	ingredient: Ingredient;
	isOpen: boolean;
	isDeletingIngredient: boolean;
	onRemoveIngredient: () => Promise<void>;
	onCloseModal: () => void;
}

export function RemoveIngredientModal({
	ingredient,
	isOpen,
	isDeletingIngredient,
	onRemoveIngredient,
	onCloseModal
}: RemoveIngredientModalProps) {
	if(!isOpen) return;

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal}>
			<ModalTitle>Remove ingredient</ModalTitle>
			<ModalDescription>Are you sure you want to remove this ingredient?</ModalDescription>

			<section className='mt-6 flex flex-col gap-6'>
				<Input
					label='Emoji'
					type='text'
					value={ingredient?.emoji}
					disabled
				/>

				<Input
					label='Name'
					type='text'
					value={ingredient?.name}
					disabled
				/>
			</section>

			<footer className='mt-12 flex items-center justify-between'>
				<Button
					variant='secondary'
					onClick={onCloseModal}
					isLoading={isDeletingIngredient}
				>
					Keep ingredient
				</Button>
				<Button
					onClick={onRemoveIngredient}
					isLoading={isDeletingIngredient}
				>
					Remove ingredient
				</Button>
			</footer>
		</Modal>
	);
}
