import { ComponentProps, LegacyRef, forwardRef } from 'react';

type CheckboxRefProps = Omit<ComponentProps<'input'>, 'type'> & {
	label: string;
};

function InputRadioRef({ label, ...rest }: CheckboxRefProps, ref: LegacyRef<HTMLInputElement>) {
	return (
		<label htmlFor={rest.name}>
			<input
				className='mr-2'
				ref={ref}
				type="radio"
				{...rest}
			/>

			{label}
		</label>
	);
}

export const InputRadio = forwardRef(InputRadioRef);
