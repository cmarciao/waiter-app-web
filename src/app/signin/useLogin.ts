'use client';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { APP_ROUTES } from '@/constants/app-routes';
import { signIn } from './actions';

const loginSchema = z.object({
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' })
});

type LoginSchema = {
	email: string;
	password: string;
}

export function useLogin() {
	const router = useRouter();

	const {register,  handleSubmit, formState: { errors, isValid, isSubmitting: isLoading}} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	});

	const handleLogin = handleSubmit(async ({ email, password }: LoginSchema) => {
		try {
			await signIn({ email, password });

			toast.success('Welcome, let\'s get to work! 🍕');
			router.replace(APP_ROUTES.private.home);
		} catch(e) {
			const error = e as Error;
			toast.error(error.message);
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
