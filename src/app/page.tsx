'use client';

import Image from 'next/image';
import { useSplashController } from './useSplashController';

import splashImage from '/public/images/splash.svg';

export default function Splash() {
	useSplashController();

	return (
		<section className="flex h-screen items-center justify-center p-24 bg-brand-red">
			<main>
				<Image
					src={splashImage}
					alt=""
					priority
				/>

				<h1 className='font-black text-white mt-6'>
					WAITER
					<span className='text-white font-thin'>APP</span>
				</h1>
			</main>
		</section>
	);
}
