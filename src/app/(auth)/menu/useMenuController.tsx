import { Product } from '@/entities/Product';
import { useGetAllProducts, useUpdateProduct } from '@/hooks/products';
import { UpdateProductParams } from '@/services/productsService/update';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useMenuController() {
	// Products states
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false);
	const [isOpenUpdateProductModal, setIsOpenUpdateProductModal] = useState(false);
	const [isOpenRemoveProductModal, setIsOpenRemoveProductModal] = useState(false);

	// Products API calls
	const { products } = useGetAllProducts();
	const { isUpdatingProduct, updateProduct } = useUpdateProduct();

	function handleOpenCreateProductModal() {
		setIsOpenCreateProductModal(true);
	}

	function handleCloseCreateProductModal() {
		setIsOpenCreateProductModal(false);
	}

	function handleOpenRemoveProductModal(product: Product) {
		setSelectedProduct(product);
		setIsOpenRemoveProductModal(true);
	}

	function handleCloseRemoveProductModal() {
		setSelectedProduct(null);
		setIsOpenRemoveProductModal(false);
	}

	function handleOpenUpdateProductModal(product: Product) {
		setSelectedProduct(product);
		setIsOpenUpdateProductModal(true);
	}

	function handleCloseUpdateProductModal() {
		setIsOpenUpdateProductModal(false);
	}

	async function handleUpdateProduct(product: UpdateProductParams) {
		try {
			await updateProduct({
				id: selectedProduct?.id,
				...product
			});

			toast.success('Product updated successfulluy. ✔');

			handleCloseUpdateProductModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when updating product.');
		}
	}

	return {
		products,
		selectedProduct,
		isOpenCreateProductModal,
		isOpenUpdateProductModal,
		isOpenRemoveProductModal,
		handleUpdateProduct,
		isUpdatingProduct,
		handleOpenCreateProductModal,
		handleCloseCreateProductModal,
		handleOpenUpdateProductModal,
		handleCloseUpdateProductModal,
		handleOpenRemoveProductModal,
		handleCloseRemoveProductModal
	};
}
