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
				Reiniciar o dia
			</ModalTitle>

			<section className='text-center mt-12'>
				<p className='max-w-sm text-center m-auto'>
					Ao reiniciar o dia, todos os pedidos serão arquivados no status atual.
				</p>

				<span className='block mt-4'>Deseja reiniciar o dia?</span>
			</section>

			<footer className='flex items-center justify-between mt-12'>
				<Link href='/home'>
					<Button variant='secondary'>
						Não, continuar pedidos
					</Button>
				</Link>

				<Button onClick={handleRefreshDay}>
					Sim, reiniciar o dia
				</Button>
			</footer>
		</Modal>
	);
}
