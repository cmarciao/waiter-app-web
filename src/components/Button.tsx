import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentProps<'button'> & {
	className?: string;
	variant?: 'primary' | 'secondary';
	isLoading?: boolean;
	children: ReactNode;
}

export function Button({
	disabled,
	className,
	variant = 'primary',
	isLoading = false,
	children,
	...props
}: ButtonProps) {
	const isPrimary = variant === 'primary';

	return (
		<button
			data-primary={isPrimary}
			disabled={disabled || isLoading}
			className={twMerge(
				'data-[primary=true]:w-full enabled:bg-brand-red data-[primary=true]:text-white',
				'h-11  text-brand-red font-semibold rounded-md',
				'disabled:cursor-not-allowed disabled:bg-gray-200',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
