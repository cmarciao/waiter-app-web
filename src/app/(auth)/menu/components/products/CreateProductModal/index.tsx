import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { CheckIcon, ImageDownIcon, ImageIcon, InfoIcon } from 'lucide-react';

import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ModalTitle } from '@/components/Modal/ModalTitle';

import { useCreateProductModal } from './useCreateProductModal';
import { CreateIngredientModal } from '../../Ingredients/CreateIngredientModal';
import { LoadScreen } from '@/components';
import Link from 'next/link';

type AddProductModalProps = {
	isOpen: boolean;
}

export function CreateProductModal({ isOpen }: AddProductModalProps) {
	if(!isOpen) return;

	const {
		register,
		errors,
		isCreateIngredienModalOpen,
		isFormValid,
		categories,
		ingredients,
		watchCategory,
		watchIngredients,
		imageUrlPreview,
		isCreatingProduct,
		handleCreateProduct,
	} = useCreateProductModal();

	if(isCreateIngredienModalOpen) {
		return <CreateIngredientModal />;
	}

	if(!ingredients || !categories) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=products' className='max-w-[928px]'>
			<ModalTitle>Novo produto</ModalTitle>

			<section>
				<form action={handleCreateProduct}>
					<div className='mt-12 flex gap-8'>
						<div className='flex-1'>
							<div className='flex items-center justify-between'>
								<h3>Imagem</h3>

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


								{!imageUrlPreview && (
									<>
										<div className="flex items-center justify-center w-full h-[240px] transition-all cursor-pointer bg-gray-50 hover:bg-gray-200">
											<ImageDownIcon color='#666'/>
										</div>
									</>
								)}

								{imageUrlPreview && (
									<Image
										src={imageUrlPreview.toString()}
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

									<strong className='ml-1'>Alterar imagem</strong>
								</div>
							</label>

							<Input
								className='mt-8'
								label='Nome do produto'
								placeholder='Quatro Queijos'
								{...register('name')}
								errorMessage={errors?.name?.message}
							/>

							<Input
								id='description'
								className='mt-8'
								label='Descrição do produto'
								placeholder='Pizza de Quatro Queijos com borda tradicional'
								{...register('description')}
								errorMessage={errors?.description?.message}
							/>

							<section className='mt-8'>
								<div className='flex items-center justify-between'>
									<span>Categoria</span>

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
												'data-[active=true]:border data-[active=true]:border-gray-300',
												'hover:border-gray-300'
											)}
										>
											<input
												id={category.name}
												className='mr-2 hidden'
												type="radio"
												value={category.id}
												{...register('category')}
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
									<h3>Ingredientes</h3>
									<Button
										type='button'
										variant='secondary'
									>
										<Link href='/menu?openedModal=creation&ingredient=true'>
											Novo ingrediente
										</Link>
									</Button>
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
								label='Busque o ingrediente'
								placeholder='Ex: Quatro Queijos'
							/>

							<div
								id='ingredients-bar'
								className='mt-6 flex flex-col gap-1 h-[476px] overflow-auto s'
							>
								{ingredients.map((ingredient) => (
									<div key={ingredient.id} >
										<label
											htmlFor={ingredient.id}
											className='w-full flex items-center justify-between p-4 rounded-md border border-gray-200 cursor-pointer hover:border-gray-300'
										>
											<span>{ingredient.emoji} {ingredient.name}</span>
											<div className='border border-gray-300 flex items-center justify-center rounded-md h-[18px] w-[18px]'>
												{watchIngredients.includes(ingredient.id) && (
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
										/>
									</div>
								))}
							</div>

							<Input
								className='mt-4'
								label='Preço'
								type='number'
								min={1}
								placeholder='Ex: R$ 10.00'
								{...register('price', {
									valueAsNumber: true,
								})}
								errorMessage={errors?.price?.message}
							/>
						</div>
					</div>

					<footer className='mt-12 flex justify-end'>
						<Button
							type='submit'
							disabled={!isFormValid}
							isLoading={isCreatingProduct}
						>
							Criar produto
						</Button>
					</footer>
				</form>
			</section>
		</Modal>
	);
}
