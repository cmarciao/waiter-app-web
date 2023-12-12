import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { User } from '@/types/User';
import { getUserById, removeUser } from '../../action';

export function useRemoveUserModal() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userId = searchParams.get('userId') || '';

	const [user, setUser] = useState<User | null>(null);
	const [state, formAction] = useFormState(handleRemoveUser, null);

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

	async function handleRemoveUser() {
		try {
			await removeUser(userId);
			toast.success('User removed successfulluy. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	}

	return {
		user,
		state,
		formAction,
		handleRemoveUser
	};
}
