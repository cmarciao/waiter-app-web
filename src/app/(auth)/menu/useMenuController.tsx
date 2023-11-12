import { Category } from '@/entities/Category';
import { Product } from '@/entities/Product';
import { useGetAllCategories, useRemoveCategory, useUpdateCategory } from '@/hooks/categories';
import { useCreateProduct, useGetAllProducts, useRemoveProduct, useUpdateProduct } from '@/hooks/products';
import { CreateProductParams } from '@/services/productsService/create';
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

	// Categories states
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [isOpenCreateCategoryModal, setIsOpenCreateCategoryModal] = useState(false);
	const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false);
	const [isOpenRemoveCategoryModal, setIsOpenRemoveCategoryModal] = useState(false);

	// Products API calls
	const { products } = useGetAllProducts();
	const { isDeletingProduct, removeProduct } = useRemoveProduct();
	const { isCreatingProduct, createProduct } = useCreateProduct();
	const { isUpdatingProduct, updateProduct } = useUpdateProduct();

	// Categories API calls
	const { categories } = useGetAllCategories();
	const { isUpdatingCategory, updateCategory } = useUpdateCategory();
	const { isRemovingCategory, removeCategory } = useRemoveCategory();

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
			else handleCloseUpdateProductModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting product.');
		}
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

	// Categories functions
	function handleOpenEdictCategoryModal(category: Category) {
		setSelectedCategory(category);
		setIsOpenEditCategoryModal(true);
	}

	function handleCloseEdictCategoryModal() {
		setSelectedCategory(null);
		setIsOpenEditCategoryModal(false);
	}

	async function handleUpdateCategory(category: Category) {
		try {
			await updateCategory(category);

			toast.success('User updated successfulluy. ✔');
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when updating user.');
		}
	}

	function handleOpenRemoveCategoryModal(category: Category) {
		setIsOpenRemoveCategoryModal(true);
		setSelectedCategory(category);
	}

	function handleCloseRemoveCategoryModal() {
		setIsOpenRemoveCategoryModal(false);
	}

	async function handleRemoveCategory() {
		try {
			if(selectedCategory) {
				await removeCategory({ id: selectedCategory.id });
			}

			toast.success('Category deleted successfulluy. ✔');

			if(isOpenRemoveCategoryModal) handleCloseRemoveCategoryModal();
			else handleCloseEdictCategoryModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting category.');
		}
	}

	function handleOpenCreateCategoryModal() {
		setIsOpenCreateCategoryModal(true);
	}

	function handleCloseCreateCategoryModal() {
		setIsOpenCreateCategoryModal(false);
	}

	return {
		products,
		categories,
		selectedProduct,
		selectedCategory,
		isOpenCreateCategoryModal,
		isOpenCreateProductModal,
		isOpenUpdateProductModal,
		isOpenRemoveProductModal,
		isOpenEditCategoryModal,
		isOpenRemoveCategoryModal,
		isUpdatingCategory,
		isRemovingCategory,
		handleRemoveCategory,
		handleCreateProduct,
		handleUpdateProduct,
		handleRemoveProduct,
		handleUpdateCategory,
		isCreatingProduct,
		isUpdatingProduct,
		isDeletingProduct,
		handleOpenCreateCategoryModal,
		handleCloseCreateCategoryModal,
		handleOpenCreateProductModal,
		handleCloseCreateProductModal,
		handleOpenUpdateProductModal,
		handleOpenEdictCategoryModal,
		handleCloseEdictCategoryModal,
		handleCloseUpdateProductModal,
		handleOpenRemoveProductModal,
		handleCloseRemoveProductModal,
		handleOpenRemoveCategoryModal,
		handleCloseRemoveCategoryModal,
	};
}
