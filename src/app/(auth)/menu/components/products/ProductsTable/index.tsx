import Image from 'next/image';
import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Table } from '@/components/Table';
import { ProductsModals } from '../ProductsModals';

import { formatPrice } from '@/utils/format-utils';
import ProductsService from '@/services/ProductsService';
import { EmptyInformation } from '@/components/EmptyInformation';

export async function ProductsTable() {
	const products = await ProductsService.getProducts();

	if(products.length === 0) {
		return (
			<div className='absolute inset-0 flex items-center justify-center'>
				<EmptyInformation
					description='Não há produtos cadastrados no momento.'
				/>
			</div>
		);
	}

	return (
		<Table.Root>
			<Table.Header title='Produtos' amount={products.length}>
				<Table.HeaderAction href='/menu?openedModal=creation'>
					Novo produto
				</Table.HeaderAction>
			</Table.Header>

			<Table.Content className='mt-4'>
				<Table.Head>
					<Table.Row>
						<Table.Th>Imagem</Table.Th>
						<Table.Th>Nome</Table.Th>
						<Table.Th>Categoria</Table.Th>
						<Table.Th>Preço</Table.Th>
						<Table.Th>Ações</Table.Th>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{products.map((product) => (
						<Table.Row key={product.id}>
							<Table.Td>
								<Image
									className='rounded-md'
									width={48}
									height={32}
									src={product.imageUrl}
									alt={product.name}
									style={{
										width: 48,
										height: 32
									}}
								/>
							</Table.Td>
							<Table.Td>{product.name}</Table.Td>
							<Table.Td>{product.category.emoji} {product.category.name}</Table.Td>
							<Table.Td>{formatPrice(product.price)}</Table.Td>
							<Table.Td>
								<Table.Actions>
									<Table.Action
										icon={<PencilIcon color='#666' />}
										hrefAction={`/menu?openedModal=update&productId=${product.id}`}
									/>
									<Table.Action
										icon={<Trash2Icon color='#D73035' />}
										hrefAction={`/menu?openedModal=removal&productId=${product.id}`}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			<ProductsModals />
		</Table.Root>
	);
}
