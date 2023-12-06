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
				'px-7 py-3 data-[primary=true]:text-white enabled:data-[primary=true]:bg-brand-red',
				'disabled:cursor-not-allowed disabled:bg-gray-200',
				'hover:brightness-90 hover:data-[primary=false]:bg-white transition-all',
				'h-full text-brand-red font-semibold rounded-md',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
