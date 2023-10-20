import Image from 'next/image';
import splashImage from '/public/images/splash.svg';

export default function Home() {
	return (
		<section className="flex h-screen items-center justify-center p-24 bg-brand-red">
			<main>
				<Image
					src={splashImage}
					alt=""
				/>

				<h1 className='font-black text-white mt-6'>
					WAITER
					<span className='text-white font-thin'>APP</span>
				</h1>
			</main>
		</section>
	);
}
