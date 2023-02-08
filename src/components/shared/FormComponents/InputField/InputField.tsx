import React, { ReactNode } from 'react';
import './InputField.scss';

export interface InterfaceInputField extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errors?: string[];
	note?: string;
	className?: string;
	refProp?: React.Ref<HTMLInputElement>;
	typeField?: 'horizontalLabel';
	suffix?: string;
	buttonsVariantGroup?: ReactNode;
}

export const InputField: React.FC<InterfaceInputField> = ({
	label,
	errors = [],
	className = '',
	note,
	refProp,
	typeField = '',
	suffix = '',
	buttonsVariantGroup,
	...props
}) => {
	return (
		<div className={`InputField ${className} ${!!errors.length ? 'error' : ''} ${typeField}`}>
			{label && (
				<label className='InputField-label label' htmlFor={props?.id}>
					{label}
				</label>
			)}

			{buttonsVariantGroup ? buttonsVariantGroup : null}

			{!suffix && <input ref={refProp} {...props} className='InputField-input input' />}

			{!!suffix && (
				<div className={`inputWrap`}>
					<span className='inputShadow'>
						{props?.value}
						{props?.value && suffix}
					</span>
					<input ref={refProp} {...props} className='InputField-input input' />
				</div>
			)}

			{errors.map((error, i) => (
				<span key={i} className='InputField-error-message error'>
					{error}
				</span>
			))}
			{note && <p className='InputField-note note'>{note}</p>}
		</div>
	);
};
