import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { Product } from '@/types/Product';
import { getProductById, removeProduct } from '../actions';

export function useRemoveProductModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const productId = searchParams.get('productId') || '';

	const [product, setProduct] = useState<Product | null>(null);
	const [isRemovingProduct, setIsRemovingProduct] = useState(false);
	const [, formAction] = useFormState(handleRemoveProduct, null);

	useEffect(() => {
		async function loadProduct() {
			try {
				const response = await getProductById(productId);

				setProduct(response);
			} catch(e) {
				const error = e as Error;
				toast.error(error.message);

				router.push('/menu?tab=products');
			}
		}

		loadProduct();
	}, []);

	async function handleRemoveProduct() {
		try {
			setIsRemovingProduct(true);

			await removeProduct(productId);

			toast.success('User deleted successfulluy. ✔');
		} catch(err) {
			toast.error('Error when deleting product.');
		} finally {
			setIsRemovingProduct(false);
		}
	}

	return {
		product,
		isRemovingProduct,
		formAction,
		handleRemoveProduct
	};
}
