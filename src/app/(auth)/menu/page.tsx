import { MenuIcon } from 'lucide-react';

import { TabNavigation } from './components/TabNavigation';
import { ProductsTable } from './components/Products/ProductsTable';
import { CategoriesTable } from './components/Categories/CategoriesTable';
import { IngredientsTable } from './components/Ingredients/IngredientsTable';

type MenuProps = {
	searchParams: { [key: string]: string };
}

export default function Menu({ searchParams }: MenuProps) {
	const tab = searchParams['tab'] || 'products';

	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="pt-10">
				<div className='flex items-center gap-4'>
					<MenuIcon width={32} height={32}/>

					<h1>Cardápio</h1>
				</div>

				<span className='block font-semibold mt-4 text-gray-400'>Gerencie os produtos do seu estabelecimento.</span>
			</header>

			<main className='mt-[4.5rem]'>
				<TabNavigation tab={tab} />

				<div className='mt-2'>
					{tab === 'products' && (
						<ProductsTable />
					)}

					{tab === 'categories' && (
						<CategoriesTable />
					)}

					{tab === 'ingredients' && (
						<IngredientsTable />
					)}
				</div>
			</main>
		</div>
	);
}
