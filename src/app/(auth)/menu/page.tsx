import { ProductsTable } from './components/products/ProductsTable';
import { MenuIcon } from 'lucide-react';

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

					<h1>Menu</h1>
				</div>

				<span className='block font-semibold mt-4'>Manage your establishment&apos;s products</span>
			</header>

			<main className='mt-[4.5rem]'>
				{tab === 'products' && (
					<ProductsTable />
				)}

				{tab === 'categories' && (
					<h1>Categories</h1>
				)}
			</main>
		</div>
	);
}
