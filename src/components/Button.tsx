import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentProps<'button'> & {
	className?: string;
	children: ReactNode;
}

export function Button({ className, children, ...props }: ButtonProps) {
	return (
		<button
			className={twMerge(
				className,
				'w-full h-11 bg-brand-red text-white font-semibold rounded-md',
				'disabled:cursor-not-allowed disabled:bg-gray-200'
			)}
			{...props}
		>
			{children}
		</button>
	);
}
