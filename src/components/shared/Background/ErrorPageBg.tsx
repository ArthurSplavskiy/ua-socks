import { FC } from 'react';

export const ErrorPageBg: FC = () => {
	return (
		<div className='Bg-ErrorPage'>
			{new Array(10).fill(undefined).map((_, i) => (
				<span key={i}></span>
			))}
		</div>
	);
};
