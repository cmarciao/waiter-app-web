'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { APP_ROUTES } from '@/constants/app-routes';

const loginSchema = z.object({
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' })
});

type LoginSchema = {
	email: string;
	password: string;
}

export function useLoginController() {
	const router = useRouter();

	const {register,  handleSubmit, formState: { errors, isValid, isSubmitting: isLoading}} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	});

	const handleLogin = handleSubmit(async (data: LoginSchema) => {
		const response = await signIn('credentials', {
			...data,
			redirect: false
		});


		if(response?.error) {
			if(response.status === 401) {
				toast.error('Invalid e-mail or password.');
			} else {
				toast.error(response?.error);
			}

			return;
		}

		toast.success('Are you ready? Let\'s get to work! 🍕');
		router.replace(APP_ROUTES.private.home);
	});

	return {
		isValid,
		isLoading,
		register,
		handleLogin,
		errors
	};
}
