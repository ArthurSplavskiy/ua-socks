import { SectionHead } from '@/components/shared/SectionHead';
import { FC } from 'react';
import { SpeedTabs } from '@/components/SpeedTabs';
import { useHomeSpeed } from '@/context/UserContext';

export const HomeSpeed: FC = () => {
	const { data } = useHomeSpeed();
	// const { data } = useRequest<IHomeSpeed>({
	// 	method: 'GET',
	// 	url: api.homePage.getSpeed
	// });

	return (
		<section className='HomeSpeed section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			{data?.tabs && <SpeedTabs data={data.tabs} />}
		</section>
	);
};
