import { SectionHead } from '@/components/shared/SectionHead';
import useRequest from '@/hooks/useRequest';
import { FC } from 'react';
import api from '@/api';
import { IHomeUsage } from '@/interfaces/api';
import { Slider } from '@/components/Slider';

export const HomeUsage: FC = () => {
	const { data } = useRequest<IHomeUsage>({
		method: 'GET',
		url: api.homePage.getUsage
	});
	return (
		<section id='tech' className='HomeUsage section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Slider slides={data?.slider} />
		</section>
	);
};
