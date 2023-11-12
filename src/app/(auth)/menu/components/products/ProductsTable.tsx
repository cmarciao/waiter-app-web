'use client';

import Image from 'next/image';
import { Table } from '@/components/Table';

import { formatPrice } from '@/utils/formatPrice';
import { useMenuController } from '../../useMenuController';
import { RemoveProductModal } from './RemoveProductModal';
import { CreateProductModal } from './CreateProductModal';

import { PencilIcon, Trash2Icon } from 'lucide-react';
import { UpdateProductModal } from './UpdateProductModal';

export function ProductsTable() {
	const {
		products,
		selectedProduct,
		isOpenCreateProductModal,
		isOpenUpdateProductModal,
		isOpenRemoveProductModal,
		handleOpenCreateProductModal,
		handleCloseCreateProductModal,
		handleOpenUpdateProductModal,
		handleCloseUpdateProductModal,
		handleOpenRemoveProductModal,
		handleCloseRemoveProductModal,
	} = useMenuController();

	return (
		<Table.Root>
			<Table.Header title='Products' amount={products.length}>
				<Table.HeaderAction onClick={handleOpenCreateProductModal}>
					New product
				</Table.HeaderAction>
			</Table.Header>

			<Table.Content>
				<Table.Head>
					<Table.Row>
						<Table.Th>Image</Table.Th>
						<Table.Th>Name</Table.Th>
						<Table.Th>Category</Table.Th>
						<Table.Th>Price</Table.Th>
						<Table.Th>Action</Table.Th>
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
										icon={<PencilIcon />}
										onClick={() => handleOpenUpdateProductModal(product)}
									/>
									<Table.Action
										icon={<Trash2Icon color='#D73035'/>}
										onClick={() => handleOpenRemoveProductModal(product)}
									/>
								</Table.Actions>
							</Table.Td>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Content>

			{isOpenCreateProductModal && (
				<CreateProductModal
					isOpen={isOpenCreateProductModal}
					onCloseModal={handleCloseCreateProductModal}
				/>
			)}

			{isOpenUpdateProductModal && (
				<UpdateProductModal
					product={selectedProduct!}
					isOpen={isOpenUpdateProductModal}
					onCloseModal={handleCloseUpdateProductModal}
				/>
			)}

			<RemoveProductModal
				product={selectedProduct!}
				isOpen={isOpenRemoveProductModal}
				onCloseModal={handleCloseRemoveProductModal}
			/>
		</Table.Root>
	);
}
