import { SectionHead } from '@/components/shared/SectionHead';
import useRequest from '@/hooks/useRequest';
import { IHomeSpeed } from '@/interfaces/api';
import { FC } from 'react';
import api from '@/api';
import { SpeedTabs } from '@/components/SpeedTabs';

export const HomeSpeed: FC = () => {
	const { data } = useRequest<IHomeSpeed>({
		method: 'GET',
		url: api.homePage.getSpeed
	});

	return (
		<section className='HomeSpeed section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			{data?.tabs && <SpeedTabs data={data?.tabs} />}
		</section>
	);
};
