import { Icon } from '../Icon/Icon';
import React, { DetailedHTMLProps, FC } from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

interface IButtonProps
	extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	color?: 'primary' | 'green' | 'red' | 'outline';
	size?: 'lg' | 'md' | 'sm';
	width?: 'fullWidth';
	loading?: boolean;
	className?: string;
	hidePadding?: 'horizontal';
	btnLink?: boolean;
	btnType?: 'text' | 'iconLeft' | 'iconRight';
	link?: string;
	icon?: 'telegram' | 'account';
	textAlign?: 'left' | 'center' | 'right';
}

export const Button: FC<IButtonProps> = ({
	color = 'primary',
	size = 'md',
	className = '',
	width = '',
	loading = false,
	btnLink = false,
	hidePadding = '',
	children,
	btnType = '',
	textAlign = 'center',
	icon = '',
	...props
}) => {
	const loadingClassName = loading ? 'loading' : '';
	return (
		<>
			{btnLink ? (
				<Link to=''>
					<button
						className={`Button ${size} ${color} ${loadingClassName} ${width} ${className} ${hidePadding} ${btnType} ${textAlign} ${icon}`}
						{...props}>
						{btnType === 'iconLeft' && icon === 'telegram' && <Icon icon='telegram-outline' />}
						{children}
						{btnType === 'iconRight' && icon === 'account' && <Icon icon='acc' />}
					</button>
				</Link>
			) : (
				<button
					className={`Button ${size} ${color} ${loadingClassName} ${width} ${className} ${hidePadding} ${btnType} ${textAlign} ${icon}`}
					{...props}>
					{btnType === 'iconLeft' && icon === 'telegram' && <Icon icon='telegram-outline' />}
					{children}
					{btnType === 'iconRight' && icon === 'account' && <Icon icon='acc' />}
				</button>
			)}
		</>
	);
};
