import { FC } from 'react';
import Select, { GroupBase, Props } from 'react-select';
import './ReactSelect.scss';

export type tReactSelectProps<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

interface iReactSelectProps extends tReactSelectProps<any, any> {
	type?: 'geo' | 'usual' | 'card';
	icon?: 'earth' | 'calendar' | 'phone';
	color?: 'primary' | 'green' | 'red';
	label?: string;
	hideIcon?: boolean;
	className?: string;
}

export const ReactSelect: FC<iReactSelectProps> = ({
	hideIcon = true,
	type,
	icon,
	color,
	label,
	className = '',
	...props
}) => {
	const isHiddenIcon = hideIcon ? 'hidden-icon' : '';

	return (
		<fieldset className='ReactSelect-group'>
			<label className='ReactSelect-label'>{label}</label>
			<Select
				className={`ReactSelect ${isHiddenIcon} ${type} ${icon} ${color} ${className}`}
				classNamePrefix='ReactSelect-select'
				isSearchable={false}
				{...props}
			/>
		</fieldset>
	);
};
