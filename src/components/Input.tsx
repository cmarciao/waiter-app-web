'use client';

import { ComponentProps, LegacyRef, forwardRef, useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import infoImage from 'public/images/info.svg';
import hidePasswordImage from 'public/images/hide-password.svg';
import showPasswordImage from 'public/images/show-password.svg';

type InputProps = ComponentProps<'input'> & {
	label: string;
	errorMessage?: string | undefined;
}

function InputRef({ label, errorMessage = undefined, ...props }: InputProps, ref: LegacyRef<HTMLInputElement>) {
	const [isShowPassword, setIsShowPassword] = useState(false);

	function handleToggleShowPassword() {
		setIsShowPassword(prevState => !prevState);
	}

	const hasError = !!errorMessage;
	const passwordIcon = isShowPassword ? showPasswordImage : hidePasswordImage;

	const isPasswordType = props.type === 'password';
	const inputType = !isPasswordType ? props.type : isShowPassword ? 'text' : 'password';

	return (
		<div data-disabled={props.disabled} className='data-[disabled=true]:opacity-50'>
			<div className='flex flex-col relative'>
				<label htmlFor={props.id}>{label}</label>
				<input
					data-error={hasError}
					data-ispassword={isPasswordType}
					id={props.id}
					ref={ref}
					className={twMerge(
						'data-[error=true]:caret-brand-red',
						'h-14 border-[1px] text-gray-400 border-gray-300 rounded-md pl-4 mt-2',
						'placeholder:text-gray-300 focus:border-[1px] focus:border-gray-400',
						'pr-4 data-[ispassword=true]:pr-10'
					)}
					autoComplete='false'
					{...props}
					type={inputType}
				/>

				{props.type === 'password' && (
					<Image
						src={passwordIcon}
						alt='Show password'
						className='absolute right-4 top-[55%]'
						onClick={handleToggleShowPassword}
					/>
				)}
			</div>

			{hasError && (
				<span className='text-brand-red flex items-center gap-2 mt-2'>
					<Image
						src={infoImage}
						alt='Info'
					/>
					{errorMessage}
				</span>
			)}
		</div>
	);
}

export const Input = forwardRef(InputRef);
