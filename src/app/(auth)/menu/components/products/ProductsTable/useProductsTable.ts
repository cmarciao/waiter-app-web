import { useState } from 'react';
import { Product } from '@/entities/Product';
import { useGetAllProducts } from '@/hooks/products';

export function useProductsTable() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false);
	const [isOpenUpdateProductModal, setIsOpenUpdateProductModal] = useState(false);
	const [isOpenRemoveProductModal, setIsOpenRemoveProductModal] = useState(false);

	const { products } = useGetAllProducts();

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

	function closeModalWhenRemoveProduct() {
		if(isOpenUpdateProductModal) handleCloseUpdateProductModal();
		else handleCloseRemoveProductModal();
	}

	return {
		products,
		selectedProduct,
		isOpenCreateProductModal,
		isOpenUpdateProductModal,
		isOpenRemoveProductModal,
		handleOpenCreateProductModal,
		handleCloseCreateProductModal,
		handleOpenUpdateProductModal,
		handleOpenRemoveProductModal,
		closeModalWhenRemoveProduct
	};
}
