import { Product } from '@/entities/Product';
import { useCreateProduct, useGetAllProducts, useRemoveProduct } from '@/hooks/products';
import { CreateProductParams } from '@/services/productsService/create';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useMenuController() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false);
	const [isOpenRemoveProductModal, setIsOpenRemoveProductModal] = useState(false);

	const { products } = useGetAllProducts();
	const { isDeletingProduct, removeProduct } = useRemoveProduct();
	const { isCreatingProduct, createProduct } = useCreateProduct();

	function handleOpenCreateProductModal() {
		setIsOpenCreateProductModal(true);
	}

	function handleCloseCreateProductModal() {
		setIsOpenCreateProductModal(false);
	}

	async function handleCreateProduct(product: CreateProductParams) {
		try {
			await createProduct(product);

			toast.success('Product created successfulluy. ✔');

			handleCloseCreateProductModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting product.');
		}
	}

	function handleOpenRemoveProductModal(product: Product) {
		setSelectedProduct(product);
		setIsOpenRemoveProductModal(true);
	}

	function handleCloseRemoveProductModal() {
		setSelectedProduct(null);
		setIsOpenRemoveProductModal(false);
	}

	async function handleRemoveProduct() {
		try {
			await removeProduct(selectedProduct!.id);

			toast.success('User deleted successfulluy. ✔');

			if(isOpenRemoveProductModal) handleCloseRemoveProductModal();
			// else handleCloseUpdateUserModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting product.');
		}
	}

	return {
		products,
		selectedProduct,
		isOpenCreateProductModal,
		isOpenRemoveProductModal,
		handleCreateProduct,
		handleRemoveProduct,
		isCreatingProduct,
		isDeletingProduct,
		handleOpenCreateProductModal,
		handleCloseCreateProductModal,
		handleOpenRemoveProductModal,
		handleCloseRemoveProductModal,
	};
}
