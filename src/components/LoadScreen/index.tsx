import { twMerge } from 'tailwind-merge';
import { Spinner } from '../Spinner';

type LoadScreenProps = {
	hasOpacityInBackground?: boolean;
}

export function LoadScreen({ hasOpacityInBackground = false }: LoadScreenProps) {
	return (
		<div
			data-active={hasOpacityInBackground}
			className={twMerge(
				'flex items-center justify-center',
				'data-[active=true]:bg-brand-gray-500-opacity data-[active=true]:absolute data-[active=true]:inset-0',
				'data-[active=false]:h-screen'
			)}
		>
			<Spinner />
		</div>
	);
}
