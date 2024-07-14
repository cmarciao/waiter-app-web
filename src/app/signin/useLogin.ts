'use client';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { APP_ROUTES } from '@/constants/app-routes';
import { signIn } from './actions';
import { ApiException } from '@/errors/ApiException';

const signInSchema = z.object({
	email: z.string().email('E-mail inválido.'),
	password: z.string().min(8, { message: 'Mínimo de 8 caracteres.' })
});

type SignInSchema = {
	email: string;
	password: string;
}

export function useLogin() {
	const router = useRouter();

	const {register,  handleSubmit, formState: { errors, isValid, isSubmitting: isLoading}} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema)
	});

	const handleLogin = handleSubmit(async ({ email, password }: SignInSchema) => {
		try {
			await signIn({ email, password });
	
			toast.success('Bem-vindo(a), tenha um bom trabalho!');
			router.replace(APP_ROUTES.private.home);
		} catch(e) {
			const error = e as ApiException;
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
