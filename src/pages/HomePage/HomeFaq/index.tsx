import { FC } from 'react';
import { SectionHead } from '@/components/shared/SectionHead';
import { Spollers } from '@/components/shared/Spollers';
import { useHomeFaq } from '@/context/UserContext';

export const HomeFaq: FC = () => {
	const { data } = useHomeFaq();
	// const { data } = useRequest<IHomeFaqs>({
	// 	method: 'GET',
	// 	url: api.homePage.getFaqs
	// });
	return (
		<section id='faq' className='HomeFaq section-offset'>
			<SectionHead title={data?.title} />
			<Spollers data={data?.faqs} />
		</section>
	);
};
