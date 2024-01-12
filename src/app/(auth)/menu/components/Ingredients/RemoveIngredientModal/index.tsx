import Link from 'next/link';

import { LoadScreen } from '@/components';
import { Input, Button } from '@/components';
import { Modal, ModalTitle, ModalDescription } from '@/components';

import { useRemoveIngredientModal } from './useRemoveIngredientModal';

type RemoveIngredientModalProps = {
	isOpen: boolean;
}

export function RemoveIngredientModal({ isOpen }: RemoveIngredientModalProps) {
	if(!isOpen) return;

	const {
		ingredient,
		isRemovingIngredient,
		formAction,
	} = useRemoveIngredientModal();

	if(!ingredient) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=ingredients'>
			<ModalTitle>Remove ingredient</ModalTitle>
			<ModalDescription>Are you sure you want to remove this ingredient?</ModalDescription>

			<form action={formAction} className='mt-6'>
				<section className='flex flex-col gap-6'>
					<Input
						label='Emoji'
						type='text'
						value={ingredient.emoji}
						disabled
					/>

					<Input
						label='Name'
						type='text'
						value={ingredient.name}
						disabled
					/>
				</section>

				<footer className='mt-12 flex items-center justify-between'>
					<Link href='/menu?tab=ingredients' >
						<Button
							type='button'
							variant='secondary'
							isLoading={isRemovingIngredient}
						>
							Keep ingredient
						</Button>
					</Link>

					<Button
						type='submit'
						isLoading={isRemovingIngredient}
					>
						Remove ingredient
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
