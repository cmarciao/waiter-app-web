'use client';

import { Button } from '@/components';
import { RefreshCwIcon, ShieldAlertIcon } from 'lucide-react';

export default function Error({ reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='flex items-center flex-col gap-8'>
				<div className='flex flex-col items-center'>
					<ShieldAlertIcon size={134} />

					<h2>Something went wrong!</h2>
				</div>

				<Button
					onClick={() => reset()}
					className='flex items-center gap-4'
				>
					Try again
					<RefreshCwIcon />
				</Button>
			</div>
		</div>
	);
}
