import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentProps<'button'> & {
	className?: string;
	children: ReactNode;
	variant?: 'primary' | 'secondary';
}

export function Button({ className, variant = 'primary', children, ...props }: ButtonProps) {
	const isPrimary = variant === 'primary';

	return (
		<button
			data-primary={isPrimary}
			className={twMerge(
				'h-11  text-brand-red font-semibold rounded-md',
				'disabled:cursor-not-allowed disabled:bg-gray-200',
				'data-[primary=true]:w-full  data-[primary=true]:bg-brand-red data-[primary=true]:text-white',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
