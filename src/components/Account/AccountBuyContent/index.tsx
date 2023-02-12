import api from '@/api';
import { TarifsList } from '@/components/TarifsList';
import useRequest from '@/hooks/useRequest';
import { IProxyTarifList } from '@/interfaces/api';
import { FC } from 'react';

export const AccountBuyContent: FC = () => {
	const { data: proxyList } = useRequest<IProxyTarifList[]>({
		method: 'GET',
		url: api.homePage.getTarifsCards
	});

	return (
		<>
			<TarifsList data={proxyList} type={'account'}></TarifsList>
		</>
	);
};
