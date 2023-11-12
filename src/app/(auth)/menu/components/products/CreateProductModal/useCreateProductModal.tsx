import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetAllCategories } from '@/hooks/categories';
import { useGetAllIngredients } from '@/hooks/ingredients';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCreateProduct } from '@/hooks/products';

const createProductSchema = z.object({
	imageUrl: z.any().refine((files) => files?.length == 1, 'File is required.'),
	name: z.string().trim().min(1, { message: 'Name is required.'}),
	description: z.string().trim().min(1, { message: 'Description is required.' }),
	price: z.number({
		invalid_type_error: 'Price is required.'
	}),
	category: z.string({ invalid_type_error: 'Category is required.' }),
	ingredients: z.string({ invalid_type_error: 'At least one ingredient must be selected' }).array().min(1, { message: 'At least one ingredient must be selected' }),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function useCreateProductModal(onCloseModal: () => void) {
	const { categories } = useGetAllCategories();
	const { ingredients } = useGetAllIngredients();

	const [isOpenCreateIngredientModal, setIsOpenCreateIngredientModal] = useState(false);
	const [imageUrlPreview, setImageUrlPreview] = useState<string | ArrayBuffer | null | undefined>(null);

	const {watch, register, handleSubmit, formState: { errors, isValid }} = useForm<CreateProductSchema>({
		resolver: zodResolver(createProductSchema)
	});
	const watchImageUrl = watch('imageUrl');
	const watchCategory = watch('category');
	const watchIngredients = watch('ingredients');

	const { isCreatingProduct, createProduct } = useCreateProduct();

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

	const handleCreateProduct = handleSubmit(async (data) => {
		try {
			const product = {
				name: data.name,
				description: data.description,
				image: watchImageUrl[0],
				price: data.price,
				categoryId: data.category,
				ingredientIds: data.ingredients,
			};

			await createProduct(product);

			toast.success('Product created successfulluy. ✔');

			onCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating product.');
		}
	});

	function handleOpenCreateIngredientModal() {
		setIsOpenCreateIngredientModal(true);
	}

	function handleCloseCreateIngredientModal() {
		setIsOpenCreateIngredientModal(false);
	}

	return {
		errors,
		categories,
		ingredients,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		isOpenCreateIngredientModal,
		isCreatingProduct,
		handleOpenCreateIngredientModal,
		handleCloseCreateIngredientModal,
		register,
		isFormValid: isValid,
		handleCreateProduct,
	};
}
