import { FC } from 'react';

export const CookieBannerBg: FC = () => {
	return (
		<div className='Bg-CookieBanner'>
			{new Array(10).fill(undefined).map((_, i) => (
				<span key={i}></span>
			))}
		</div>
	);
};
