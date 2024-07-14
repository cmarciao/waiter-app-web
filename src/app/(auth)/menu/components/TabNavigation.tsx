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
				Produtos
			</ItemTabNavigation>

			<ItemTabNavigation
				href='categories'
				isActive={tab === 'categories'}
			>
				Categorias
			</ItemTabNavigation>

			<ItemTabNavigation
				href='ingredients'
				isActive={tab === 'ingredients'}
			>
				Ingredientes
			</ItemTabNavigation>
		</nav>
	);
}
