import { ItemTabNavigation } from '@/components/ItemTabNavigation';

type NavigationProps = {
	tab: string;
}

export function TabNavigation({ tab }: NavigationProps) {
	return (
		<nav className='flex items-center gap-4'>
			<ItemTabNavigation
				href='products'
				isActive={tab === 'products'}
			>
				Products
			</ItemTabNavigation>

			<ItemTabNavigation
				href='categories'
				isActive={tab === 'categories'}
			>
				Categories
			</ItemTabNavigation>

			<ItemTabNavigation
				href='ingredients'
				isActive={tab === 'ingredients'}
			>
				Ingredients
			</ItemTabNavigation>
		</nav>
	);
}
