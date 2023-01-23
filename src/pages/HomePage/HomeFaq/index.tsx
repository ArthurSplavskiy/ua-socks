import { SectionHead } from '@/components/shared/SectionHead';
import useRequest from '@/hooks/useRequest';
import { FC } from 'react';
import api from '@/api';
import { IHomeFaqs, IHomeUsage } from '@/interfaces/api';
import { Slider } from '@/components/Slider';
import { Spollers } from '@/components/shared/Spollers';

export const HomeFaq: FC = () => {
	const { data } = useRequest<IHomeFaqs>({
		method: 'GET',
		url: api.homePage.getFaqs
	});
	return (
		<section id='faq' className='HomeFaq section-offset'>
			<SectionHead title={data?.title} />
			<Spollers data={data?.faqs} />
		</section>
	);
};
