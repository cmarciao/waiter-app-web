'use client';

import { Button, Input, LoadScreen } from '@/components';
import { Users2Icon } from 'lucide-react';
import { useMyProfile } from './useMyProfile';
import { EmptyInformation } from '@/components/EmptyInformation';

export default function MyProfile() {
	const {
		isLoadProfile,
		isLoadProfileError,
		handleReload,
		register,
		errors,
		handleSaveProfile
	} = useMyProfile();

	if(isLoadProfile) {
		return (
			<div className='absolute inset-0 flex items-center justify-center'>
				<LoadScreen />;
			</div>
		);
	}
	
	if(isLoadProfileError) {
		return (
			<div className='absolute inset-0 flex items-center justify-center'>
				<EmptyInformation
					description='Ocorreu algum erro ao carregar o perfil, por favor, tente novamente.'
					onTryAgain={handleReload}
				/>
			</div>
		);
	}

	return (
		<div className="px-4 max-w-7xl m-auto">
			<header className="pt-10">
				<div className='flex items-center gap-4'>
					<Users2Icon
						width={32}
						height={32}
					/>

					<h1>Meu perfil</h1>
				</div>

				<span className='block font-semibold mt-4 text-gray-400'>Gerencie sua conta.</span>
			</header>

			<main className='mt-[4.5rem]'>
				<form onSubmit={handleSaveProfile}>
					<div className='grid grid-cols-2 gap-8'>
						<Input
							id='name'
							label="Nome"
							type="text"
							placeholder="Seu nome da conta"
							errorMessage={errors.name?.message}
							{...register('name')}
						/>
						<Input
							id="email"
							label="E-mail"
							type="email"
							placeholder="Seu e-mail de acesso"
							errorMessage={errors.email?.message}
							{...register('email')}
						/>
						<Input
							id="password"
							label="Senha"
							type="password"
							placeholder="Sua senha de acesso"
							errorMessage={errors.password?.message}
							{...register('password')}
						/>
						<Input
							id="confirmPassword"
							label="Confirme sua senha"
							type="password"
							placeholder="Confirme sua senha de acesso"
							errorMessage={errors.confirmPassword?.message}
							{...register('confirmPassword')}
						/>
					</div>

					<div className='mt-8 text-right'>
						<Button>
                            Salvar alterações
						</Button>
					</div>
				</form>
			</main>
		</div>
	);
}