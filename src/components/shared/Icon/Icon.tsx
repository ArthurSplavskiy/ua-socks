import { FC } from 'react';
import './Icon.scss';

export type tIcon =
	| 'acc'
	| 'arrow-down'
	| 'arrow-left'
	| 'arrow-rigth'
	| 'box'
	| 'burger'
	| 'calendar'
	| 'checkbox-checked'
	| 'checkbox'
	| 'circle-err'
	| 'circle-info'
	| 'circle-ok'
	| 'clock'
	| 'close'
	| 'code'
	| 'coin'
	| 'connect'
	| 'document'
	| 'done'
	| 'download'
	| 'earth'
	| 'exit'
	| 'eye-close'
	| 'eye-open'
	| 'info'
	| 'phone'
	| 'plus'
	| 'proxy'
	| 'radiobutton-filled'
	| 'radiobutton'
	| 'setting'
	| 'settings'
	| 'smale'
	| 'support'
	| 'telegram-outline'
	| 'telegram'
	| 'upload'
	| 'wallet';

type tIconSize = '20' | '8';
type tColor = 'primary' | 'black' | 'white' | 'red' | 'green';

interface iProps {
	className?: string;
	icon: tIcon;
	size?: tIconSize;
	color?: tColor;
}

/**
 * @param {tIcon} icon - icon type
 *      for sort icon pass className with sort directions 'asc' | 'desc'
 * @param {String} className - icon className
 * @param {tIconSize} size - icon size - "xxsm" - 8px | "xsm" - 12px | "sm" - 16px | "md" - 24px | "lg" - 32px
 * @param {tColor} color - icon color - "gray" | "dark-gray" | "light-gray" | "black" | "white" | "yellow" | "red" | "green" | "orange
 * @return JSX.Element
 */
export const Icon: FC<iProps> = ({ icon, size = '20', className = '', color = '' }) => {
	return <i className={`icon icon__${size} ${color} icon-${icon} ${className}`} />;
};
