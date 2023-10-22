'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { authService } from '@/app/services/authService';
import { SignInParams } from '@/app/services/authService/signIn';
import toast from 'react-hot-toast';
import axios from 'axios';

const loginSchema = z.object({
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' })
});

type LoginSchema = {
	email: string;
	password: string;
}

export function useLoginController() {
	const {register,  handleSubmit, formState: { errors, isValid}} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	});

	const { isLoading, mutateAsync } = useMutation({
		mutationFn: async (data: SignInParams) => {
			return authService.signIn(data);
		}
	});

	const handleLogin = handleSubmit(async (data: LoginSchema) => {
		try {
			const { accessToken } = await mutateAsync(data);
			toast.success('Are you ready? Let\'s get to work! 🍕');

			console.log(accessToken);
		} catch(err) {
			if(axios.isAxiosError(err)) {
				const errorMessage = err.response?.data.message;
				toast.error(errorMessage);
			} else {
				toast.error('Some error happened. 🙁');
			}
		}
	});

	return {
		isValid,
		isLoading,
		register,
		handleLogin,
		errors
	};
}
