import { LoadScreen } from '@/components';
import { Button, Input } from '@/components';
import { Modal, ModalTitle } from '@/components';

import { useUpdateCategoryModal } from './useUpdateCategoryModal';

type UpdateCategoryModalProps = {
	isOpen: boolean;
}

export function UpdateCategoryModal({ isOpen }: UpdateCategoryModalProps) {
	if(!isOpen) return;

	const {
		category,
		isValid,
		errors,
		isUpdatingCategory,
		isRemovingCategory,
		register,
		handleUpdateCategory,
		handleRemoveCategory
	} = useUpdateCategoryModal();

	if(!category) {
		return <LoadScreen hasOpacityInBackground />;
	}

	return (
		<Modal open={isOpen} hrefModalClose='/menu?tab=categories' >
			<ModalTitle>Edit category</ModalTitle>

			<form className='mt-6' onSubmit={handleUpdateCategory}>
				<div className='flex flex-col gap-6'>
					<Input
						id='emoji'
						label='Emoji'
						type='text'
						errorMessage={errors?.emoji?.message}
						{...register('emoji')}
						defaultValue={category.emoji}
					/>

					<Input
						id='name'
						label='Nome'
						type='text'
						errorMessage={errors?.name?.message}
						{...register('name')}
						defaultValue={category.name}
					/>
				</div>

				<footer className='mt-12 flex justify-between'>
					<Button
						type='button'
						variant='secondary'
						isLoading={isUpdatingCategory || isRemovingCategory}
						onClick={handleRemoveCategory}
					>
						Excluir categoria
					</Button>

					<Button
						type='submit'
						isLoading={isUpdatingCategory || isRemovingCategory}
						disabled={!isValid}
					>
						Salvar alterações
					</Button>
				</footer>
			</form>
		</Modal>
	);
}
