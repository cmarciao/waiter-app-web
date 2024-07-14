'use client';

import { EmptyInformation } from '@/components/EmptyInformation';

export default function Error({ reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='flex items-center flex-col gap-8'>
				<EmptyInformation
					description='Algo de errado aconteceu, por favor, tente novamente..'
					onTryAgain={reset}
				/>
			</div>
		</div>
	);
}
