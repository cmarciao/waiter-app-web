import { Spinner } from '../Spinner';

export function LoadScreen() {
	return (
		<div className='absolute inset-0 flex items-center justify-center bg-brand-gray-500-opacity'>
			<Spinner />
		</div>
	);
}
