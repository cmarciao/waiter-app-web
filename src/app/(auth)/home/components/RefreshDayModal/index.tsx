import { RefreshCcw } from 'lucide-react';

import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { ModalTitle } from '@/components/Modal/ModalTitle';

import { useRefreshDayModal } from './useRefreshDayModal';

type RefreshDayModalProps = {
	isOpen: boolean;
	onCloseModal: () => void;
}

export function RefreshDayModal({ isOpen, onCloseModal }: RefreshDayModalProps) {
	const {
		handleRefreshDay
	} = useRefreshDayModal(onCloseModal);

	return (
		<Modal
			open={isOpen}
			onCloseModal={onCloseModal}
			className='max-w-lg w-full'
		>
			<ModalTitle className='flex items-center gap-4'>
				<RefreshCcw />
				Refresh the day
			</ModalTitle>

			<section className='text-center mt-12'>
				<p>
					When you restart the day, all requests will be archived in the current status.
				</p>

				<span className='mt-4'>Do you want to refresh the day?</span>
			</section>

			<footer className='flex items-center justify-between mt-12'>
				<Button variant='secondary' onClick={onCloseModal}>
					No, we can continue
				</Button>

				<Button onClick={handleRefreshDay}>
					Yes, refresh the day
				</Button>
			</footer>
		</Modal>
	);
}
