import { FC } from 'react';
import { SectionHead } from '@/components/shared/SectionHead';
import { Social } from '@/components/Social';
import { useHomeSocial } from '@/context/UserContext';

export const HomeSocial: FC = () => {
	const { data } = useHomeSocial();
	// const { data } = useRequest<IHomeSocial>({
	// 	method: 'GET',
	// 	url: api.homePage.getSocial
	// });

	return (
		<section className='section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Social data={data?.social} />
		</section>
	);
};
