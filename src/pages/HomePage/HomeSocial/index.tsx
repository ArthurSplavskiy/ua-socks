import useRequest from '@/hooks/useRequest';
import { FC } from 'react';
import api from '@/api';
import { SectionHead } from '@/components/shared/SectionHead';
import { IHomeSocial } from '@/interfaces/api';
import { Social } from '@/components/Social';

export const HomeSocial: FC = () => {
	const { data } = useRequest<IHomeSocial>({
		method: 'GET',
		url: api.homePage.getSocial
	});

	return (
		<section className='section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Social data={data?.social} />
		</section>
	);
};
