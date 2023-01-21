import api from '@/api';
import { SectionHead } from '@/components/shared/SectionHead';
import { TarifsList } from '@/components/TarifsList';
import useRequest from '@/hooks/useRequest';
import { IHomeTarifs, IProxyTarifList } from '@/interfaces/api';
import { FC } from 'react';

export const HomeTarif: FC = () => {
	const { data } = useRequest<IHomeTarifs>({
		method: 'GET',
		url: api.homePage.getTarifsTitle
	});
	const { data: proxyList } = useRequest<IProxyTarifList[]>({
		method: 'GET',
		url: api.homePage.getTarifsCards
	});

	return (
		<section id='tariffs' className='HomeTarif section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<TarifsList data={proxyList} />
		</section>
	);
};
