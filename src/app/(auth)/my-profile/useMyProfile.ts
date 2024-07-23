import { Profile } from '@/types/Profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getMyProfile, updateMyProfile } from './actions';
import toast from 'react-hot-toast';

const myProfileSchema = z.object({
	name: z.string().min(1, { message: 'Por favor, insira um nome.' }),
	email: z.string().min(1, { message: 'Por favor, insira um email' }).email({ message: 'Email inválido.' }),
	password: z.string()
		.min(8, { message: 'Mínimo 8 caracteres.' })
		.optional()
		.or(z.literal(''))
		.transform((value) => value === '' ? undefined : value),
	confirmPassword: z.string()
		.min(8, { message: 'Mínimo 8 caracteres.' })
		.optional()
		.or(z.literal(''))
		.transform((value) => value === '' ? undefined : value),
}).refine(
	(values) => {
		return values.password === values.confirmPassword;
	},
	{
		message: 'As senhas não são iguais.',
		path: ['confirmPassword'],
	}
);

type MyProfileSchema = z.infer<typeof myProfileSchema>;

export function useMyProfile() {
	const [myProfile, setMyProfile] = useState<Profile | null>(null);
	const [isLoadProfile, setIsLoadProfile] = useState(true);
	const [isLoadProfileError, setIsLoadProfileError] = useState(false);

	const { register, handleSubmit, formState: { errors } } = useForm<MyProfileSchema>({
		resolver: zodResolver(myProfileSchema),
		defaultValues: myProfile || undefined,
		values: myProfile || undefined,
	});

	useEffect(() => {
		async function loadData() {
			try {

				const profile = await getMyProfile();
				setMyProfile(profile);

			} catch {
				setIsLoadProfileError(true);
				toast.error('Não foi possível carregar o perfil.');
			} finally {
				setIsLoadProfile(false);
			}
		}

		loadData();
	}, []);

	const handleSaveProfile = handleSubmit(async (data: MyProfileSchema) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { confirmPassword, ...body } = data;

			const parsedData = JSON.parse(JSON.stringify(body));
			await updateMyProfile(parsedData);

			toast.success('Perfil editado com sucesso.');
		} catch(e) {
			toast.error('Não foi possível editar o perfil.');
		}
	});

	function handleReload() {
		window.location.reload();
	}

	return {
		myProfile,
		isLoadProfile,
		isLoadProfileError,
		handleReload,
		register,
		errors,
		handleSaveProfile
	};
}
