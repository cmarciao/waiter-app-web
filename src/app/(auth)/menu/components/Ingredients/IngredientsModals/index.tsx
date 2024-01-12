'use client';

import { useSearchParams } from 'next/navigation';

import { CreateIngredientModal } from '../CreateIngredientModal';
import { UpdateIngredientModal } from '../UpdateIngredientModal';
import { RemoveIngredientModal } from '../RemoveIngredientModal';

export function IngredientsModals() {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal');

	return (
		<>
			<CreateIngredientModal isOpen={openedModal === 'creation'} />
			<UpdateIngredientModal isOpen={openedModal === 'update'} />
			<RemoveIngredientModal isOpen={openedModal === 'removal'} />
		</>
	);
}
