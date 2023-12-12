import { ComponentProps, LegacyRef, forwardRef } from 'react';

type CheckboxRefProps = Omit<ComponentProps<'input'>, 'type'> & {
	label: string;
};

function InputRadioRef({ label, ...rest }: CheckboxRefProps, ref: LegacyRef<HTMLInputElement>) {
	return (
		<div>
			<input
				className='mr-2'
				ref={ref}
				type="radio"
				id={label}
				{...rest}
			/>

			<label htmlFor={label}>{label}</label>
		</div>
	);
}

export const InputRadio = forwardRef(InputRadioRef);
