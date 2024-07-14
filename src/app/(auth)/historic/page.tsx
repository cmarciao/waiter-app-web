import { BookText } from 'lucide-react';
import { HistoricTable } from './components/HistoricTable';

type MenuProps = {
	searchParams: { [key: string]: string };
}

export default function Historic({ searchParams }: MenuProps) {
	const orderBy = searchParams['orderBy'] || 'desc';

	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="pt-10">
				<div className='flex items-center gap-4'>
					<BookText
						width={32}
						height={32}
					/>

					<h1>Histórico</h1>
				</div>

				<span className='block font-semibold mt-4 text-gray-400'>Visualize pedidos anteriores.</span>
			</header>

			<main className='mt-[4.5rem]'>
				<HistoricTable
					orderBy={orderBy}
				/>
			</main>
		</div>
	);
}
