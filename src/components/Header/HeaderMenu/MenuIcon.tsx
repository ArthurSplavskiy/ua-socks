import { DetailedHTMLProps, FC } from 'react';
import styles from './MenuIcon.module.scss';

interface IMenuIconProps
	extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	active: boolean;
}

export const MenuIcon: FC<IMenuIconProps> = ({ active, ...props }) => {
	return (
		<div className={`${styles.menuIcon} ${active ? styles.active : ''}`} {...props}>
			<span></span>
		</div>
	);
};
