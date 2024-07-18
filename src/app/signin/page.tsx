'use client';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useLogin } from './useLogin';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/app-routes';

export default function Login() {
	const {
		isValid,
		isLoading,
		register,
		handleLogin,
		errors
	} = useLogin();

	return (
		<section className="h-screen flex-center p-4">
			<main className='max-w-sm w-full'>
				<header className="text-center">
					<span className='font-semibold'>Bem-vindo(a) ao</span>
					<h1 className="font-black mt-1">
						WAITER
						<span className="font-thin">APP</span>
					</h1>
				</header>

				<form className={'mt-10'} onSubmit={handleLogin} noValidate>
					<section className='flex flex-col gap-8'>
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
						Fazer login
					</Button>
				</form>

				<span className='text-center mt-8 block'>
					Ainda não tem conta? 
					<Link className='ml-2 font-semibold text-brand-red' href={APP_ROUTES.public.signUp}>
						Crie aqui.
					</Link>
				</span>
			</main>
		</section>
	);
}
