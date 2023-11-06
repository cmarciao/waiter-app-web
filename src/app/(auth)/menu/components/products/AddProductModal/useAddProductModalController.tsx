import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetAllCategories } from '@/hooks/categories';
import { useCreateIngredient, useGetAllIngredients } from '@/hooks/ingredients';
import { useEffect, useState } from 'react';
import { CreateProductParams } from '@/services/productsService/create';
import { CreateIngredientParam } from '@/services/ingredientsService/create';
import toast from 'react-hot-toast';
import axios from 'axios';

const addProductSchema = z.object({
	imageUrl: z.any().refine((files) => files?.length == 1, 'File is required.'),
	name: z.string().trim().min(1, { message: 'Name is required.'}),
	description: z.string().trim().min(1, { message: 'Description is required.' }),
	price: z.number({
		invalid_type_error: 'Price is required.'
	}),
	category: z.string({ invalid_type_error: 'Category is required.' }),
	ingredients: z.string({ invalid_type_error: 'At least one ingredient must be selected' }).array().min(1, { message: 'At least one ingredient must be selected' }),
});

type AddProductSchema = z.infer<typeof addProductSchema>;

export function useAddProductModalController(onAddProduct: (product: CreateProductParams) => Promise<void>) {
	const { categories } = useGetAllCategories();
	const { ingredients } = useGetAllIngredients();
	const { isCreatingIngredient, createIngredient } = useCreateIngredient();

	const [isOpenAddIngredientModal, setIsOpenAddIngredientModal] = useState(false);
	const [imageUrlPreview, setImageUrlPreview] = useState<string | ArrayBuffer | null | undefined>(null);

	const {watch, register, handleSubmit, formState: { errors, isValid }} = useForm<AddProductSchema>({
		resolver: zodResolver(addProductSchema)
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

	const handleAddProduct = handleSubmit(async (data) => {
		const product = {
			name: data.name,
			description: data.description,
			image: watchImageUrl[0],
			price: data.price,
			categoryId: data.category,
			ingredientIds: data.ingredients,
		};

		await onAddProduct(product);
	});

	function handleOpenAddIngredientModal() {
		setIsOpenAddIngredientModal(true);
	}

	function handleCloseAddIngredientModal() {
		setIsOpenAddIngredientModal(false);
	}

	async function handleAddIngredient(ingredient: CreateIngredientParam) {
		try {
			await createIngredient(ingredient);

			toast.success('Ingredient created successfulluy. ✔');
			handleCloseAddIngredientModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when creating ingredient.');
		}
	}

	return {
		errors,
		categories,
		ingredients,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		isOpenAddIngredientModal,
		isCreatingIngredient,
		handleOpenAddIngredientModal,
		handleCloseAddIngredientModal,
		register,
		isFormValid: isValid,
		handleAddProduct,
		handleAddIngredient
	};
}
