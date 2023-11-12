import axios from 'axios';
import toast from 'react-hot-toast';
import { Product } from '@/entities/Product';
import { useRemoveProduct } from '@/hooks/products';

export function useRemoveProductModal(selectedProduct: Product, onCloseModal: () => void) {
	const { isDeletingProduct, removeProduct } = useRemoveProduct();

	async function handleRemoveProduct() {
		try {
			await removeProduct(selectedProduct.id);

			toast.success('User deleted successfulluy. ✔');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when deleting product.');
		}
	}

	return {
		isDeletingProduct,
		handleRemoveProduct
	};
}
