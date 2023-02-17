import { FC } from 'react';
import { SectionHead } from '@/components/shared/SectionHead';
import { HoverTabs } from '@/components/HoverTabs';
import { useHomeAdvantages } from '@/context/UserContext';
import './Advantages.scss';

export const HomeAdvantages: FC = () => {
	const { data } = useHomeAdvantages();
	// const { data } = useRequest<IHomeAdvantages>({
	// 	method: 'GET',
	// 	url: api.homePage.getAdvantages
	// });
	return (
		<section id='advantage' className='Advantages'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			{data?.advantages && <HoverTabs data={data.advantages} />}
		</section>
	);
};
