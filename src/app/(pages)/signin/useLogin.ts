import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
	email: z.string().email('Invalid email.'),
	password: z.string().min(8, { message: 'Min 8 characters.' })
});

type LoginSchema = {
	email: string;
	password: string;
}

export function useLogin() {
	const {register,  handleSubmit, formState: { errors, isValid, isLoading }} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	});

	const handleLogin = handleSubmit((data: LoginSchema) => {
		console.log(data);
	});

	return {
		isValid,
		isLoading,
		register,
		handleLogin,
		errors
	};
}
