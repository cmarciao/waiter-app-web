import axios from 'axios';
import toast from 'react-hot-toast';

import { useRemoveUser } from '@/hooks/users';

export function useRemoveUserModal(handleCloseModal: () => void) {
	const { isRemovingUser, removeUser } = useRemoveUser();

	async function handleRemoveUser(id: string) {
		try {
			await removeUser(id);

			toast.success('User removed successfulluy. ✔');

			handleCloseModal();
		} catch(err) {
			if(axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
				return;
			}

			toast.error('Error when removing user.');
		}
	}

	return {
		isRemovingUser,
		handleRemoveUser
	};
}
