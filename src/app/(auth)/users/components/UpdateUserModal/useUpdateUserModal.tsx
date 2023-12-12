import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { User } from '@/types/User';
import { getUserById, updateUser } from '../../action';
import { useRemoveUserModal } from '../RemoveUserModal/useRemoveUserModal';

export function useUpdateUserModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userId = searchParams.get('userId') || '';

	const { handleRemoveUser } = useRemoveUserModal();

	const [user, setUser] = useState<User | null>(null);
	const [state, formAction] = useFormState(handlUpdateUser, null);

	useEffect(() => {
		async function loadUser() {
			try {
				const response = await getUserById(userId);
				setUser(response);
			} catch(e) {
				toast.error('User not found');
				router.push('/users');
			}
		}

		loadUser();
	}, []);

	async function handlUpdateUser(_prevState: unknown, formData: FormData) {
		try {
			const response = await updateUser(userId, formData);

			if(response?.errors) {
				return response.errors;
			}

			toast.success('User updated successfully. ✔');
		} catch(err) {
			toast.error('Error when creating user.');
		}
	}

	return {
		user,
		state,
		formAction,
		handlUpdateUser,
		handleRemoveUser,
	};
}
