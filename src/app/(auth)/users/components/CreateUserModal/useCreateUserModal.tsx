import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';

import { createUser } from '../../action';

export function useCreateUserModal() {
	const [state, formAction] = useFormState(handleCreateUser, null);

	async function handleCreateUser(_prevState: unknown, formData: FormData) {
		try {
			const response = await createUser(formData);

			if(response?.errors) {
				return response.errors;
			}

			toast.success('User created successfully. ✔');
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
		}
	}

	return {
		state,
		formAction
	};
}
