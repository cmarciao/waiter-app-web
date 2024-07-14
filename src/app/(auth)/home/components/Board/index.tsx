'use client';

import { RefreshDayModal } from '../RefreshDayModal';
import { OrdersBoard } from '@/components/OrdersBoard';

import { useBoard } from './useBoard';
import { EmptyInformation } from '@/components/EmptyInformation';
import { LoadScreen } from '@/components';

export function Board() {
	const {
		handleReload,
		isLoadOrdersError,
		isLoadingOrders,
		waitingOrders,
		preparingOrders,
		finishedOrders,
		isRefreshDayModalOpen
	} = useBoard();

	const isOrdersEmpty = 
		waitingOrders.length === 0 && 
		preparingOrders.length === 0 && 
		finishedOrders.length === 0;

	if(isLoadingOrders) {
		return (
			<div className='absolute -z-1 inset-0 flex items-center justify-center'>
				<LoadScreen />;
			</div>
		);
	}
	
	if(isLoadOrdersError) {
		return (
			<div className='absolute -z-1 inset-0 flex items-center justify-center'>
				<EmptyInformation
					description='Ocorreu algum erro ao carregar os produtos, por favor, tente novamente.'
					onTryAgain={() => window.location.reload()}
				/>
			</div>
		);
	}
	
	if(isOrdersEmpty && !isLoadingOrders) {
		return (
			<div className='absolute -z-1 inset-0 flex items-center justify-center'>
				<EmptyInformation
					description='Não há pedidos cadastrados no momento.'
				/>
			</div>
		);
	}

	return (
		<main className='grid grid-cols-3 gap-8'>
			<OrdersBoard
				icon='🕒'
				title='Fila de espera'
				quantity={waitingOrders.length}
				orders={waitingOrders}
			/>

			<OrdersBoard
				icon='👨‍🍳'
				title='Em produção'
				quantity={preparingOrders.length}
				orders={preparingOrders}
			/>

			<OrdersBoard
				icon='✅'
				title='Pronto'
				quantity={finishedOrders.length}
				orders={finishedOrders}
			/>

			<RefreshDayModal
				isOpen={isRefreshDayModalOpen}
			/>
		</main>
	);
}
