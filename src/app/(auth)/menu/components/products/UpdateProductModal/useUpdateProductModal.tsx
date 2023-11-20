import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetAllCategories } from '@/hooks/categories';
import { useGetAllIngredients } from '@/hooks/ingredients';
import { useEffect, useState } from 'react';
import { useUpdateProduct } from '@/hooks/products';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Product } from '@/types/Product';
import { useRemoveProductModal } from '../RemoveProductModal/useRemoveProductModal';

const addProductSchema = z.object({
	imageUrl: z.any(),
	name: z.string().trim().min(1, { message: 'Name is required.'}),
	description: z.string().trim().min(1, { message: 'Description is required.' }),
	price: z.number({
		invalid_type_error: 'Price is required.'
	}),
	category: z.string({ invalid_type_error: 'Category is required.' }),
	ingredients: z.string({ invalid_type_error: 'At least one ingredient must be selected' }).array().min(1, { message: 'At least one ingredient must be selected' }),
});

type AddProductSchema = z.infer<typeof addProductSchema>;

export function useUpdateProductModal(selectedProduct: Product, onCloseModal: () => void) {
	const { categories } = useGetAllCategories();
	const { ingredients } = useGetAllIngredients();
	const { isUpdatingProduct, updateProduct } = useUpdateProduct();
	const { isRemovingProduct, handleRemoveProduct: onRemoveProduct } = useRemoveProductModal(selectedProduct, onCloseModal);

	const [imageUrlPreview, setImageUrlPreview] = useState<string | ArrayBuffer | null | undefined>(null);

	const {watch, register, handleSubmit, formState: { errors, isValid }} = useForm<AddProductSchema>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			imageUrl: {}
		}
	});
	const watchImageUrl = watch('imageUrl');
	const watchCategory = watch('category');
	const watchIngredients = watch('ingredients');

	useEffect(() => {
		const fileReader = new FileReader();

		if(watchImageUrl) {
			const blob = new Blob([watchImageUrl[0]]);
			fileReader?.readAsDataURL(blob);
			fileReader.onload = (readerEvent) => {
				const result = readerEvent.target?.result;

				if(result === 'data:application/octet-stream;base64,dW5kZWZpbmVk') return;

				setImageUrlPreview(result);
			};
		}
	}, [watchImageUrl]);

	const handleUpdateProduct = handleSubmit(async (data) => {
		try {
			const product = {
				name: data.name,
				description: data.description,
				price: data.price,
				categoryId: data.category,
				ingredientIds: data.ingredients,
			};

			if(watchImageUrl[0]) {
				Object.assign(product, { image: watchImageUrl[0] });
			}

			await updateProduct({
				id: selectedProduct.id,
				...product
			});

			toast.success('Product updated successfulluy. ✔');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when updating product.');
		}
	});

	async function handleRemoveProduct() {
		await onRemoveProduct();
	}

	return {
		errors,
		categories,
		ingredients,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		register,
		isFormValid: isValid,
		handleUpdateProduct,
		handleRemoveProduct,
		isUpdatingProduct,
		isRemovingProduct
	};
}
