import { InfoIcon } from 'lucide-react';
import { ReactNode } from 'react';

type InputGroupProps = {
	errorMessage?: string;
	children: ReactNode;
}

export function InputGroup({ errorMessage, children }: InputGroupProps) {
	return (
		<div>
			<div className='flex gap-8'>
				{children}
			</div>

			{errorMessage && (
				<span className='text-brand-red flex items-center gap-2 mt-2'>
					<InfoIcon />
					{errorMessage}
				</span>
			)}
		</div>
	);
}
