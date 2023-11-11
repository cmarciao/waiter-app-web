'use client';

import Image from 'next/image';
import { Table } from '@/components/Table';

import { formatPrice } from '@/utils/formatPrice';
import { useMenuController } from '../../useMenuController';
import { RemoveProductModal } from './RemoveProductModal';
import { AddProductModal } from './AddProductModal';

import { PencilIcon, Trash2Icon } from 'lucide-react';
import { EditProductModal } from './EditProductModal';

export function ProductsTable() {
	const {
		products,
		selectedProduct,
		isOpenCreateProductModal,
		isOpenUpdateProductModal,
		isOpenRemoveProductModal,
		isCreatingProduct,
		isUpdatingProduct,
		isDeletingProduct,
		handleOpenCreateProductModal,
		handleCloseCreateProductModal,
		handleOpenUpdateProductModal,
		handleCloseUpdateProductModal,
		handleOpenRemoveProductModal,
		handleCloseRemoveProductModal,
		handleCreateProduct,
		handleUpdateProduct,
		handleRemoveProduct,
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
				<AddProductModal
					isOpen={isOpenCreateProductModal}
					isCreatingProduct={isCreatingProduct}
					onCloseModal={handleCloseCreateProductModal}
					onCreateProduct={handleCreateProduct}
				/>
			)}

			{isOpenUpdateProductModal && (
				<EditProductModal
					product={selectedProduct!}
					isOpen={isOpenUpdateProductModal}
					onEditProduct={handleUpdateProduct}
					isEditingProduct={isUpdatingProduct}
					onCloseModal={handleCloseUpdateProductModal}
				/>
			)}

			<RemoveProductModal
				product={selectedProduct!}
				isOpen={isOpenRemoveProductModal}
				onRemoveProduct={handleRemoveProduct}
				isDeletingProduct={isDeletingProduct}
				onCloseModal={handleCloseRemoveProductModal}
			/>
		</Table.Root>
	);
}
