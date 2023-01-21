import { SectionHead } from '@/components/shared/SectionHead';
import { IHomeAdvantages } from '@/interfaces/api';
import { FC } from 'react';
import api from '@/api';
import './Advantages.scss';
import useRequest from '@/hooks/useRequest';
import { HoverTabs } from '@/components/HoverTabs';

export const HomeAdvantages: FC = () => {
	const { data } = useRequest<IHomeAdvantages>({
		method: 'GET',
		url: api.homePage.getAdvantages
	});
	return (
		<section id='advantage' className='Advantages'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			{data?.advantages && <HoverTabs data={data.advantages} />}
		</section>
	);
};
