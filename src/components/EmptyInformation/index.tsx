import Image from 'next/image';
import EmptyImage from '@/../public/images/empty.svg';
import { Button } from '../Button';
import { RefreshCwIcon } from 'lucide-react';
import Link from 'next/link';

type EmptyInformationProps = {
	redirect?: string;
    description: string;
	onTryAgain?: () => void;
}

export function EmptyInformation({ description, onTryAgain, redirect }: EmptyInformationProps) {
	return (
		<div className='flex items-center justify-center p-4'>
			<div className='flex flex-col items-center gap-8'>
				<div className='text-center'>
					<Image src={EmptyImage} alt='Empty' width={500} />

					<p className='font-semibold text-gray-400 mt-4'>
						{description}
					</p>
				</div>

				{onTryAgain ? (
					<Button
						onClick={onTryAgain}
						className='flex items-center gap-4'
					>
						Tentar novamente
						<RefreshCwIcon />
					</Button>
				) : redirect && (
					<Link href={redirect}>
						<Button
							onClick={onTryAgain}
							className='flex items-center gap-4'
						>
							Sair
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}