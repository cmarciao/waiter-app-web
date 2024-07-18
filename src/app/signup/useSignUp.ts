import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signUp } from '../signin/actions';
import toast from 'react-hot-toast';
import { APP_ROUTES } from '@/constants/app-routes';
import { ApiException } from '@/errors/ApiException';
import { delay } from '@/utils/delay';

const signUpSchema = z.object({
	businessName: z.string().min(1, 'Por favor, insira o nome do seu comércio.'),
	name: z.string().min(1, 'Por favor, insira o seu nome.'),
	email: z.string().email('E-mail inválido.'),
	password: z.string().min(8, { message: 'Mínimo de 8 caracteres.' })
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function useSignUp() {
	const router = useRouter();

	const {register,  handleSubmit, formState: { errors, isValid, isSubmitting: isLoading}} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema)
	});

	const handleSignUp = handleSubmit(async (data: SignUpSchema) => {
		try {
			await signUp(data);
			
			toast.success('Usuário cadastrado com sucesso!');
                
			delay(1000 * 2).then(() => {
				toast.success('Bem-vindo(a), tenha um bom trabalho!');
			});
	
			
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
		handleSignUp,
		errors
	};
}