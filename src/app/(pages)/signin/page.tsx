'use client';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useLogin } from './useLogin';

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
					<span className='font-semibold'>Welcome to</span>
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
							placeholder="Your access email"
							errorMessage={errors.email?.message}
							{...register('email')}
						/>

						<Input
							id="password"
							label="Password"
							type="password"
							placeholder="Your access password"
							errorMessage={errors.password?.message}
							{...register('password')}
						/>
					</section>

					<Button
						type='submit'
						className='mt-10'
						disabled={!isValid || isLoading}
					>
						Login
					</Button>
				</form>
			</main>
		</section>
	);
}
