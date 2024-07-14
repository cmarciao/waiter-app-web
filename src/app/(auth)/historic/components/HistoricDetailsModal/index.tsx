import Image from 'next/image';

import { LoadScreen } from '@/components';
import { Modal, ModalTitle } from '@/components';

import { formatDate, formatPrice } from '@/utils/format-utils';
import { useHistoricDetailsModal } from './useHistoricDetailsModal';

type OrderDetailsModalProps = {
	isOpen: boolean;
}

export function HistoricDetailsModal({ isOpen }: OrderDetailsModalProps) {
	if(!isOpen) return;

	const { historic } = useHistoricDetailsModal();

	if(!historic) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/historic' className='pb-12'>
			<ModalTitle>Mesa {historic.table}</ModalTitle>

			<section className='flex flex-col gap-2 mt-8'>
				<span className='text-small'>Data do pedido</span>
				<strong>{formatDate(new Date(historic.createdAt))}</strong>
			</section>

			<section className='mt-8'>
				<span className='text-small'>Itens</span>
				<section className='flex flex-col gap-4 mt-4'>
					{historic.products.map((product) => (
						<div key={product.id} className='flex gap-3'>
							<Image
								className='rounded-md'
								width={56}
								height={48}
								src={product.imageUrl}
								alt={product.name}
								style={{
									width: 56,
									height: 48
								}}
							/>

							<span className='text-gray-300'>{product.count}x</span>

							<div className='flex flex-col'>
								<strong>{product.name}</strong>
								<span>{formatPrice(product.price)}</span>
							</div>
						</div>
					))}
				</section>

				<div className='mt-6 flex justify-between items-center'>
					<span className='text-small'>Total</span>
					<strong>{formatPrice(historic.total)}</strong>
				</div>
			</section>
		</Modal>
	);
}
