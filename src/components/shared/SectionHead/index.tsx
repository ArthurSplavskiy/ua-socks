import { FC } from 'react';
import './SectionHead.scss';

interface Props {
	title: string | undefined;
	subtitle?: string | undefined;
}

export const SectionHead: FC<Props> = ({ title, subtitle }) => {
	return (
		<>
			{title && (
				<div className='SectionHead'>
					<h2>{title}</h2>
					{subtitle && <p>{subtitle}</p>}
				</div>
			)}
		</>
	);
};
