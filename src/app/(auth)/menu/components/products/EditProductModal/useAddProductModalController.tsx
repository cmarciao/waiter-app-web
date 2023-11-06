import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetAllCategories } from '@/hooks/categories';
import { useGetAllIngredients } from '@/hooks/ingredients';
import { useEffect, useState } from 'react';
import { UpdateProductParams } from '@/services/productsService/update';

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

export function useAddProductModalController(onAddProduct: (product: UpdateProductParams) => Promise<void>) {
	const { categories } = useGetAllCategories();
	const { ingredients } = useGetAllIngredients();

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

	const handleAddProduct = handleSubmit(async (data) => {
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

		await onAddProduct(product);
	});

	return {
		errors,
		categories,
		ingredients,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		register,
		isFormValid: isValid,
		handleAddProduct,
	};
}
