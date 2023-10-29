import { CheckIcon, ImageIcon, InfoIcon, Loader2 } from 'lucide-react';

import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ModalTitle } from '@/components/Modal/ModalTitle';

import { useAddProductModalController } from './useAddProductModalController';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { Product } from '@/entities/Product';
import { UpdateProductParams } from '@/services/productsService/update';

type EditProductModalProps = {
	product: Product;
	isOpen: boolean;
	isEditingProduct: boolean;
	onCloseModal: () => void;
	onEditProduct: (product: UpdateProductParams) => Promise<void>
}

export function EditProductModal({
	product,
	isOpen,
	isEditingProduct,
	onCloseModal,
	onEditProduct
}: EditProductModalProps) {
	const {
		register,
		errors,
		isFormValid,
		categories,
		ingredients,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		handleAddProduct
	} = useAddProductModalController(onEditProduct);

	const isImageValid = imageUrlPreview !== 'data:application/octet-stream;base64,IA==' && imageUrlPreview != null;
	const imageToShow = isImageValid ? imageUrlPreview : product.imageUrl;

	return (
		<Modal open={isOpen} onCloseModal={onCloseModal} className='max-w-[928px]'>
			<ModalTitle>New product</ModalTitle>

			<section>
				<form className='mt-12 flex gap-8'>
					<div className='flex-1'>
						<div className='flex items-center justify-between'>
							<h3>Image</h3>

							{errors?.imageUrl?.message && (
								<div className='text-brand-red flex items-center gap-2'>
									<InfoIcon />
									<span>{`${errors?.imageUrl?.message}`}</span>
								</div>
							)}
						</div>

						<label htmlFor="dropzone-file" className="mt-4 flex flex-col items-center rounded-md justify-center border border-gray-200">
							<input
								id="dropzone-file"
								type="file"
								className="hidden"
								{...register('imageUrl')}
							/>

							{!imageToShow && (
								<div className="flex items-center justify-center w-full h-[240px] bg-gray-50 animate-spin">
									<Loader2 color='#666'/>
								</div>
							)}

							{imageToShow && (
								<Image
									src={`${imageToShow}`}
									height={240}
									width={416}
									style={{
										maxWidth: 416,
										maxHeight: 240,
										borderTopLeftRadius: 6,
										borderTopRightRadius: 6,
										objectFit: 'cover',
										cursor: 'pointer'
									}}
									alt=''
								/>

							)}

							<div className='h-[60px] flex items-center text-brand-red cursor-pointer'>
								<ImageIcon color='#D73035'/>

								<strong className='ml-1'>Change Image</strong>
							</div>
						</label>


						<Input
							className='mt-8'
							label='Product name'
							placeholder='Pepperoni Pizza'
							{...register('name')}
							errorMessage={errors?.name?.message}
							defaultValue={product.name}
						/>

						<Input
							id='description'
							className='mt-8'
							label='Description'
							placeholder='Pepperoni Pizza with tradicional borders'
							{...register('description')}
							errorMessage={errors?.description?.message}
							defaultValue={product.description}
						/>

						<section className='mt-8'>
							<div className='flex items-center justify-between'>
								<span>Category</span>

								{errors?.category?.message && (
									<div className='text-brand-red flex items-center gap-2'>
										<InfoIcon />
										<span>{errors?.category?.message}</span>
									</div>
								)}
							</div>

							<div className='mt-4 flex flex-wrap gap-x-3 gap-y-4'>
								{categories.map((category) => (
									<label
										data-active={watchCategory === category.id}
										key={category.id}
										htmlFor={category.name}
										className={twMerge(
											'cursor-pointer flex gap-2 px-[14px] py-[10px] rounded-3xl shadow-equals justify-center focus:bg-gray-300 border border-white',
											'data-[active=true]:border data-[active=true]:border-gray-300'
										)}
									>
										<input
											id={category.name}
											className='mr-2 hidden'
											type="radio"
											value={category.id}
											{...register('category')}
											defaultChecked={product.category.id === category.id}
										/>

										<span>{category.emoji}</span>
										<span>{category.name}</span>
									</label>
								))}
							</div>
						</section>
					</div>

					<div className='flex-1'>
						<header>
							<div className='flex items-center justify-between'>
								<h3>Ingredients</h3>
							</div>

							{errors?.ingredients?.message && (
								<div className='text-brand-red flex items-center gap-2'>
									<InfoIcon />
									<span>{errors?.ingredients?.message}</span>
								</div>
							)}
						</header>

						<Input
							className='mt-6'
							label='Search the ingredient'
							placeholder='Ex: Pepporoni'
						/>

						<div
							id='ingredients-bar'
							className='mt-6 flex flex-col gap-1 h-[476px] overflow-auto s'
						>
							{ingredients.map((ingredient) => (
								<div
									key={ingredient.id}
									className='p-4 rounded-md border border-gray-200'
								>
									<label
										htmlFor={ingredient.id}
										className='w-full flex items-center justify-between'
									>
										<span>{ingredient.emoji} {ingredient.name}</span>
										<div className='border border-gray-300 flex items-center justify-center rounded-md h-[18px] w-[18px]'>
											{watchIngredients && watchIngredients.includes(ingredient.id) && (
												<CheckIcon width={11} height={11} color='#000'/>
											)}
										</div>
									</label>
									<input
										id={ingredient.id}
										type="checkbox"
										value={ingredient.id}
										className='hidden'
										{...register('ingredients')}
										defaultChecked={product.ingredients.some(item => item.id === ingredient.id)}
									/>
								</div>
							))}
						</div>

						<Input
							className='mt-4'
							label='Price'
							type='number'
							min={1}
							placeholder='Ex: R$ 10.00'
							{...register('price', {
								valueAsNumber: true,
							})}
							errorMessage={errors?.price?.message}
							defaultValue={product.price}
						/>
					</div>

				</form>
			</section>

			<footer className='mt-12 flex justify-end'>
				<Button
					disabled={!isFormValid}
					isLoading={isEditingProduct}
					onClick={handleAddProduct}
				>
					Save product
				</Button>
			</footer>
		</Modal>
	);
}
