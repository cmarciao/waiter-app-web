import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type NavigationProps = {
	tab: string;
}

export function Navigation({ tab }: NavigationProps) {
	return (
		<nav>
			<Link
				data-active={tab === 'products'}
				href='/menu?tab=products'
				className={twMerge(
					'inline-block py-4 w-48 hover:bg-gray-200 rounded-md text-center',
					'data-[active=true]:text-brand-red data-[active=true]:font-bold data-[active=false]:text-gray-400'
				)}
			>
				Products
			</Link>

			<Link
				data-active={tab === 'categories'}
				href='/menu?tab=categories'
				className={twMerge(
					'inline-block py-4 w-48 hover:bg-gray-200 rounded-md text-center',
					'data-[active=true]:text-brand-red data-[active=true]:font-bold data-[active=false]:text-gray-400'
				)}
			>
				Categories
			</Link>

			<Link
				data-active={tab === 'ingredients'}
				href='/menu?tab=ingredients'
				className={twMerge(
					'inline-block py-4 w-48 hover:bg-gray-200 rounded-md text-center',
					'data-[active=true]:text-brand-red data-[active=true]:font-bold data-[active=false]:text-gray-400'
				)}
			>
				Ingredients
			</Link>
		</nav>
	);
}
