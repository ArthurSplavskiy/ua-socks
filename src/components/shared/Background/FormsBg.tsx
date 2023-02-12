import { FC } from 'react';

export const FormsBg: FC = () => {
	return (
		<div className='Bg-Forms'>
			{new Array(10).fill(undefined).map((_, i) => (
				<span key={i}></span>
			))}
		</div>
	);
};
