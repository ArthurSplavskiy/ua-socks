import { FC } from 'react';
import { SectionHead } from '@/components/shared/SectionHead';
import { Slider } from '@/components/Slider';
import { useHomeUsage } from '@/context/UserContext';

export const HomeUsage: FC = () => {
	const { data } = useHomeUsage();
	// const { data } = useRequest<IHomeUsage>({
	// 	method: 'GET',
	// 	url: api.homePage.getUsage
	// });
	return (
		<section id='tech' className='HomeUsage section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Slider slides={data?.slider} />
		</section>
	);
};
