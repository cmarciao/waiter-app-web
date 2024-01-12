import Link from 'next/link';
import { HomeIcon, RefreshCcw } from 'lucide-react';

import { Order } from '@/types/Order';
import { Button } from '@/components/Button';
import { Board } from './components/Board';

import OrdersService from '@/services/OrdersService';

export default async function Home() {
	const orders: Order[] = await OrdersService.getOrders();

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
						<Link href='/home?openedModal=refresh'>
							<Button
								className='flex items-center gap-2'
								variant='secondary'
							>
								<RefreshCcw
									size={24}
									color='#D73035'
								/>

								Restart the day
							</Button>
						</Link>
					</div>
				</div>

				<span className='block font-semibold mt-4 text-gray-400'>Track customer requests.</span>
			</header>

			<main className='mt-[4.5rem] grid grid-cols-3 gap-8'>
				<Board
					orders={orders}
				/>
			</main>
		</div>
	);
}
