'use client';

import Link from 'next/link';
import { HomeIcon, RefreshCcw } from 'lucide-react';

import { Board } from './components/Board';
import { Button } from '@/components/Button';
import { WebSocketProvider } from '@/contexts/WebSocketContext';

export default function Home() {
	return (
		<WebSocketProvider>
			<div className="px-4 max-w-7xl m-auto pb-[4.5rem]">
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

										Reiniciar o dia
								</Button>
							</Link>
						</div>
					</div>

					<span className='block font-semibold mt-4 text-gray-400'>Acompanhe os pedidos dos clientes.</span>
				</header>

				<main className='mt-[4.5rem] grid grid-cols-3 gap-8'>
					<Board />
				</main>
			</div>
		</WebSocketProvider>
	);
}
