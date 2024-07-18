'use client';

import { Button, Input } from '@/components';
import { APP_ROUTES } from '@/constants/app-routes';
import Link from 'next/link';
import { useSignUp } from './useSignUp';

export default function SignUp() {
	const {
		handleSignUp,
		register,
		errors,
		isValid,
		isLoading
	} = useSignUp();

	return (
		<section className="max-w-3xl w-full h-screen m-auto flex-center p-4">
			<main className='w-full'>
				<header className="text-center">
					<span className='font-semibold'>Bem-vindo(a) ao</span>
					<h1 className="font-black mt-1">
						WAITER
						<span className="font-thin">APP</span>
					</h1>
				</header>

				<form className='w-full mt-10' onSubmit={handleSignUp} noValidate>
					<section className='w-full grid grid-cols-2 gap-8'>
						<Input
							id="businessName"
							label="Nome do comércio"
							type="text"
							placeholder="Nome do seu comércio"
							errorMessage={errors.businessName?.message}
							{...register('businessName')}
						/>

						<Input
							id="name"
							label="Nome de usuário"
							type="text"
							placeholder="Seu nome de usuário"
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
					</section>

					<Button
						type='submit'
						className='mt-10 w-full'
						disabled={!isValid}
						isLoading={isLoading}
					>
						Criar conta
					</Button>
				</form>

				<span className='text-center mt-8 block'>
					Já possui uma conta?
					<Link className='ml-2 font-semibold text-brand-red' href={APP_ROUTES.public.signIn}>
						Entre aqui.
					</Link>
				</span>
			</main>
		</section>
	);
}