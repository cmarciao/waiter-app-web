'use client';

import { ComponentProps, LegacyRef, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';

type InputProps = ComponentProps<'input'> & {
	label: string;
	className?: string;
	errorMessage?: string | undefined;
}

function InputRef({ label, className, errorMessage = undefined, ...props }: InputProps, ref: LegacyRef<HTMLInputElement>) {
	const [isShowPassword, setIsShowPassword] = useState(false);

	function handleToggleShowPassword() {
		setIsShowPassword(prevState => !prevState);
	}

	const hasError = !!errorMessage;
	const PasswordIcon = isShowPassword ? EyeIcon : EyeOffIcon;

	const isPasswordType = props.type === 'password';
	const inputType = !isPasswordType ? props.type : isShowPassword ? 'text' : 'password';

	return (
		<div data-disabled={props.disabled} className={twMerge(
			'data-[disabled=true]:opacity-50',
			className
		)}>
			<div className='flex flex-col relative'>
				<label className='w-fit' htmlFor={props.name}>{label}</label>
				<input
					id={props.name}
					data-error={hasError}
					data-ispassword={isPasswordType}
					ref={ref}
					className={twMerge(
						'data-[error=true]:caret-brand-red',
						'h-14 border text-gray-400 border-gray-300 rounded-md pl-4 mt-2',
						'placeholder:text-gray-300 focus:border-gray-400',
						'pr-4 data-[ispassword=true]:pr-10'
					)}
					autoComplete='false'
					{...props}
					type={inputType}
				/>

				{props.type === 'password' && (
					<button
						type='button'
						className='absolute right-4 top-[55%]'
						onClick={handleToggleShowPassword}
					>
						<PasswordIcon />
					</button>
				)}
			</div>

			{hasError && (
				<span className='text-brand-red flex items-center gap-2 mt-2'>
					<InfoIcon />
					{errorMessage}
				</span>
			)}
		</div>
	);
}

export const Input = forwardRef(InputRef);
