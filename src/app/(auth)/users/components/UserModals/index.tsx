'use client';

import { useSearchParams } from 'next/navigation';

import { CreateUserModal } from '../CreateUserModal';
import { RemoveUserModal } from '../RemoveUserModal';
import { UpdateUserModal } from '../UpdateUserModal';

export function UserModals() {
	const searchParams = useSearchParams();
	const openedModal = searchParams.get('openedModal') || '';

	return (
		<>
			<CreateUserModal
				isOpen={openedModal === 'creation'}
			/>

			<UpdateUserModal
				isOpen={openedModal === 'update'}
			/>

			<RemoveUserModal
				isOpen={openedModal === 'removal'}
			/>
		</>
	);
}
