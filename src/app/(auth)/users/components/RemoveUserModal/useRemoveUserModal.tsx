import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { User } from '@/types/Users';
import { getUserById, removeUser } from '../../action';
import { ApiException } from '@/errors/ApiException';

export function useRemoveUserModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userId = searchParams.get('userId') || '';

	const [user, setUser] = useState<User | null>(null);
	const [isRemovingUser, setIsRemovingUser] = useState(false);
	const [, formAction] = useFormState(handleRemoveUser, null);

	useEffect(() => {
		async function loadUser() {
			try {
				const response = await getUserById(userId);
				setUser(response);
			} catch(e) {
				const error = e as ApiException;
				toast.error(error.message);

				router.push('/users');
			}
		}

		loadUser();
	}, []);

	async function handleRemoveUser() {
		try {
			setIsRemovingUser(true);

			await removeUser(userId);

			toast.success('User removed successfulluy. ✔');
		} catch(e) {
			const error = e as ApiException;
			toast.error(error.message);
		} finally {
			setIsRemovingUser(false);
		}
	}

	return {
		user,
		isRemovingUser,
		formAction,
		handleRemoveUser
	};
}
