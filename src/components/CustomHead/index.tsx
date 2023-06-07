import { useOgContent } from '@/context/UserContext';
import { FC, useEffect } from 'react';

export const CustomHead: FC = () => {
	const { data } = useOgContent();
	useEffect(() => {
		if (data) {
			document.head.insertAdjacentHTML(
				'afterbegin',
				`
					<meta property="og:locale" content="uk" />
					<meta property="og:title" content="${data.title}" />
					<meta property="og:description" content="${data.description}" />
					<meta property="og:url" content="[url]" />
					<meta property="og:image" content="${data.image}" />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
				`
			);
		}
	}, [data]);

	return <></>;
};
