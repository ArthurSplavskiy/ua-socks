import { FC } from 'react';
import { SectionHead } from '@/components/shared/SectionHead';
import { TarifsList } from '@/components/TarifsList';
import { useHomeTarifs, useProxyTarifs } from '@/context/UserContext';

export const HomeTarif: FC = () => {
	const { data } = useHomeTarifs();
	const { data: proxyList } = useProxyTarifs();
	// const { data } = useRequest<IHomeTarifs>({
	// 	method: 'GET',
	// 	url: api.homePage.getTarifsTitle
	// });
	// const { data: proxyList } = useRequest<IProxyTarifList[]>({
	// 	method: 'GET',
	// 	url: api.homePage.getTarifsCards
	// });

	return (
		<section id='tariffs' className='HomeTarif section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<TarifsList data={proxyList} />
		</section>
	);
};
