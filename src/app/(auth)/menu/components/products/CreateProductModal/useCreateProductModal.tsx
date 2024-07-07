import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Category } from '@/types/Category';
import { Ingredient } from '@/types/Ingredient';

import { createProduct } from '../actions';
import { getCategories } from '../../Categories/actions';
import { getIngredients } from '../../Ingredients/actions';

const createProductSchema = z.object({
	imageUrl: z.any().refine((files) => files?.length == 1, 'File is required.'),
	name: z.string().trim().min(1, { message: 'Name is required.' }),
	description: z.string().trim().min(1, { message: 'Description is required.' }),
	price: z.number({
		required_error: 'Price is required.'
	}),
	category: z.string({ required_error: 'Category is required.' }),
	ingredients: z.string({ required_error: 'At least one ingredient must be selected' }).array().min(1, { message: 'At least one ingredient must be selected' }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export function useCreateProductModal() {
	const searchParams = useSearchParams();
	const isCreateIngredienModalOpen = searchParams.get('ingredient');

	const [categories, setCategories] = useState<Category[]>();
	const [ingredients, setIngredients] = useState<Ingredient[]>();
	const [imageUrlPreview, setImageUrlPreview] = useState<string | ArrayBuffer | null | undefined>(null);

	const { control, register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<CreateProductSchema>({
		resolver: zodResolver(createProductSchema)
	});
	const watchImageUrl = useWatch({ control, name: 'imageUrl' });
	const watchCategory = useWatch({ control, name: 'category' });
	const watchIngredients = useWatch({ control, name: 'ingredients' });

	useEffect(() => {
		async function loadData() {
			const [
				categoriesResponse,
				ingredientsResponse,
			] = await Promise.all([getCategories(), getIngredients()]);

			setCategories(categoriesResponse);
			setIngredients(ingredientsResponse);
		}

		loadData();
	}, []);

	useEffect(() => {
		const fileReader = new FileReader();

		if (watchImageUrl) {
			const blob = new Blob([watchImageUrl[0]]);

			fileReader?.readAsDataURL(blob);
			fileReader.onload = (readerEvent) => {
				const result = readerEvent.target?.result;

				if (result === 'data:application/octet-stream;base64,dW5kZWZpbmVk') return;

				setImageUrlPreview(result);
			};
		}
	}, [watchImageUrl]);

	const handleCreateProduct: () => void = handleSubmit(async (data: CreateProductSchema) => {
		try {
			const formData = new FormData();

			formData.append('name', data.name);
			formData.append('description', data.description);
			formData.append('image', watchImageUrl[0]);
			formData.append('price', `${data.price}`);
			formData.append('categoryId', data.category);
			formData.append('ingredientIds', JSON.stringify(data.ingredients));

			await createProduct(formData);

			toast.success('Product created successfulluy. ✔');
		} catch (e) {
			const error = e as Error;
			toast.error(error.message);
		}
	});

	return {
		errors,
		isCreateIngredienModalOpen,
		categories,
		ingredients,
		watchCategory,
		watchIngredients: watchIngredients || [],
		imageUrlPreview,
		isCreatingProduct: isSubmitting,
		register,
		isFormValid: isValid,
		handleCreateProduct,
	};
}
