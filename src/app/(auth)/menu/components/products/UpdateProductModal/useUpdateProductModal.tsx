import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { getProductById, updateProduct } from '../actions';
import { getCategories } from '../../Categories/actions';
import { getIngredients } from '../../Ingredients/actions';

import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import { Ingredient } from '@/types/Ingredient';

import { useRemoveProductModal } from '../RemoveProductModal/useRemoveProductModal';
import { ApiException } from '@/errors/ApiException';
import { debounce } from '@/utils/debounce';

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

export function useUpdateProductModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const productId = searchParams.get('productId') || '';

	const [product, setProduct] = useState<null | Product>(null);
	const [isLoadingData, setIsLoadingData] = useState(true);
	const [categories, setCategories] = useState<Category[]>();
	const [ingredients, setIngredients] = useState<Ingredient[]>();
	
	const [filterIngredients, setFilterIngredients] = useState('');
	const [imageUrlPreview, setImageUrlPreview] = useState<string | ArrayBuffer | null | undefined>(null);

	const { isRemovingProduct, handleRemoveProduct: onRemoveProduct } = useRemoveProductModal();

	const {control, register, handleSubmit, setValue, formState: { errors, isValid, isSubmitting }} = useForm<AddProductSchema>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			imageUrl: {}
		}
	});
	const watchImageUrl = useWatch({ control, name: 'imageUrl' });
	const watchCategory = useWatch({ control, name: 'category' });
	const watchIngredients = useWatch({ control, name: 'ingredients', defaultValue: []});

	const loadIngredients = useCallback(async () => {
		try {
			const ingredients = await getIngredients(filterIngredients);
			setIngredients(ingredients);
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);
		}
	}, [filterIngredients]);

	useEffect(() => {
		debounce(() => {
			loadIngredients();
		});
	}, [filterIngredients]);

	useEffect(() => {
		async function loadData() {
			try {
				const [
					productResponse,
					categoriesResponse,
				] = await Promise.all([getProductById(productId), getCategories()]);

				setProduct(productResponse);
				setCategories(categoriesResponse);

				const ingredientIds = productResponse.ingredients.map(ingredient => ingredient.id);

				setValue('ingredients', ingredientIds);
				setValue('category', productResponse.category.id);
			} catch(e) {
				const error = e as Error;
				toast.error(error.message);

				router.push('/menu?tab=products');
			} finally {
				setIsLoadingData(false);
			}
		}

		loadData();
	}, []);

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

	const handleUpdateProduct: () => void = handleSubmit(async (data) => {
		try {
			const formData = new FormData();

			formData.append('name', data.name);
			formData.append('description', data.description);
			formData.append('price', `${data.price}`);
			formData.append('categoryId', data.category);
			formData.append('ingredientIds', JSON.stringify(data.ingredients));

			if(watchImageUrl[0]) {
				formData.append('image', watchImageUrl[0]);
			}

			await updateProduct(productId, formData);

			toast.success('Product updated successfulluy. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	});

	async function handleRemoveProduct() {
		await onRemoveProduct();
	}

	function handleFilterIngredients(filter: string) {
		setFilterIngredients(filter);
	}

	return {
		isLoadingData,
		product,
		handleFilterIngredients,
		categories,
		ingredients,
		errors,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		isFormValid: isValid,
		isUpdatingProduct: isSubmitting,
		isRemovingProduct,
		register,
		handleUpdateProduct,
		handleRemoveProduct,
	};
}
