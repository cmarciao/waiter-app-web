import Link from 'next/link';
import { RefreshCcw } from 'lucide-react';

import { Button } from '@/components/Button';
import { Modal, ModalTitle } from '@/components';

import { useRefreshDayModal } from './useRefreshDayModal';

type RefreshDayModalProps = {
	isOpen: boolean;
}

export function RefreshDayModal({ isOpen }: RefreshDayModalProps) {
	const {
		handleRefreshDay
	} = useRefreshDayModal();

	return (
		<Modal
			open={isOpen}
			hrefModalClose='/home'
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
				<Button variant='secondary'>
					<Link href='/home'>
						No, we can continue
					</Link>
				</Button>

				<Button onClick={handleRefreshDay}>
					Yes, refresh the day
				</Button>
			</footer>
		</Modal>
	);
}
