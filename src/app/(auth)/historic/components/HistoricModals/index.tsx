'use client';

import { useSearchParams } from 'next/navigation';

import { HistoricDetailsModal } from '../HistoricDetailsModal';
import { RemoveOrderModalModal } from '../RemoveOrderModal';

export function HistoricModals() {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	return (
		<>
			<HistoricDetailsModal
				isOpen={openedModal === 'details'}
			/>

			<RemoveOrderModalModal
				isOpen={openedModal === 'removal'}
			/>
		</>
	);
}
