'use client';

import { HomeIcon, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/Button';
import { OrdersBoard } from '@/components/OrdersBoard';
import { ORDER_STATES } from '@/constants/order-states';
import { RefreshDayModal } from './components/RefreshDayModal';

import { useHome } from './useHome';

export default function Home() {
	const {
		orders,
		isOpenRefreshDayModal,
		handleOpenRefreshDayModal,
		handleCloseRefreshDayModal
	} = useHome();

	const waitingOrders = orders.filter((order) => order.orderState === ORDER_STATES.WAITING);
	const preparingOrders = orders.filter((order) => order.orderState === ORDER_STATES.PREPARING);
	const finishedOrders = orders.filter((order) => order.orderState === ORDER_STATES.FINISHED);

	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="pt-10">
				<div className='flex items-center justify-between gap-4'>
					<div className='flex items-center gap-2'>
						<HomeIcon
							width={32}
							height={32}
						/>
						<h1>Home</h1>
					</div>

					<div>
						<Button
							className='flex items-center gap-2'
							variant='secondary'
							onClick={handleOpenRefreshDayModal}
						>
							<RefreshCcw
								size={24}
								color='#D73035'
							/>
							Restart the day
						</Button>
					</div>
				</div>

				<span className='block font-semibold mt-4 text-gray-400'>Track customer requests.</span>
			</header>

			<main className='mt-[4.5rem] grid grid-cols-3 gap-8'>
				<OrdersBoard
					icon='🕒'
					title='Waiting'
					quantity={waitingOrders.length}
					orders={waitingOrders}
				/>

				<OrdersBoard
					icon='👨‍🍳'
					title='Preparing'
					quantity={preparingOrders.length}
					orders={preparingOrders}
				/>

				<OrdersBoard
					icon='✅'
					title='Finished'
					quantity={finishedOrders.length}
					orders={finishedOrders}
				/>
			</main>

			<RefreshDayModal
				isOpen={isOpenRefreshDayModal}
				onCloseModal={handleCloseRefreshDayModal}
			/>
		</div>
	);
}
