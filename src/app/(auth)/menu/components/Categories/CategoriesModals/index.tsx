'use client';

import { useSearchParams } from 'next/navigation';

import { CreateCategoryModal } from '../CreateCategoryModal';
import { UpdateCategoryModal } from '../UpdateCategoryModal';
import { RemoveCategoryModal } from '../RemoveCategoryModal';

export function CategoriesModals() {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	return (
		<>
			<CreateCategoryModal isOpen={openedModal === 'creation'} />
			<UpdateCategoryModal isOpen={openedModal === 'update'} />
			<RemoveCategoryModal isOpen={openedModal === 'removal'} />
		</>
	);
}
