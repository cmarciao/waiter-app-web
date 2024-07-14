import Image from 'next/image';
import { useFormStatus } from 'react-dom';

import { formatDate, formatPrice } from '@/utils/format-utils';

import { Button } from '@/components/Button';
import { LoadScreen } from '@/components/LoadScreen';
import { Modal, ModalTitle, ModalDescription } from '@/components';

import { useRemoveOrderModal } from './useRemoveOrderModal';

type RemoveOrderModalProps = {
	isOpen: boolean;
}

function ActionsButtons() {
	const { pending } = useFormStatus();

	return (
		<Button
			className='mt-8'
			variant='secondary'
			isLoading={pending}
		>
			Excluir pedido
		</Button>
	);
}

export function RemoveOrderModalModal({ isOpen }: RemoveOrderModalProps) {
	if(!isOpen) return;

	const {
		historic,
		handleRemoveHistoricOrder
	} = useRemoveOrderModal();

	if(!historic) {
		return <LoadScreen hasOpacityInBackground/>;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/historic'>
			<ModalTitle>Excluir pedido</ModalTitle>
			<ModalDescription>Tem certeza que deseja excluir o pedido?</ModalDescription>

			<form action={handleRemoveHistoricOrder}>
				<section className='flex flex-col gap-2 mt-8'>
					<span className='text-small'>Mesa</span>
					<strong>{historic.table}</strong>
				</section>

				<section className='flex flex-col gap-2 mt-8'>
					<span className='text-small' >Data do pedido</span>
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

					<ActionsButtons />
				</section>
			</form>
		</Modal>
	);
}
