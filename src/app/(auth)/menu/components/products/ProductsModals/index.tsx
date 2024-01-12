'use client';

import { useSearchParams } from 'next/navigation';

import { CreateProductModal } from '../CreateProductModal';
import { UpdateProductModal } from '../UpdateProductModal';
import { RemoveProductModal } from '../RemoveProductModal';

export function ProductsModals() {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	return (
		<>
			<CreateProductModal isOpen={openedModal === 'creation'} />
			<UpdateProductModal isOpen={openedModal === 'update'} />
			<RemoveProductModal isOpen={openedModal === 'removal'} />
		</>
	);
}
