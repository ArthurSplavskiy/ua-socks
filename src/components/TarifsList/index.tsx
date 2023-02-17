import { useInterfaceText } from '@/context/UserContext';
import { IProxyTarif, IProxyTarifList } from '@/interfaces/api';
import { ISelectOption } from '@/interfaces/shared';
import { FC, useEffect, useState } from 'react';
import { ReactSelect } from '../shared/FormComponents/ReactSelect/ReactSelect';
import { TarifCard } from '../shared/TarifCard';
import './TarifsList.scss';

interface Props {
	data?: IProxyTarifList[];
	type?: 'account';
}

export const TarifsList: FC<Props> = ({ data, type }) => {
	//const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const initGeoValue = data?.map((d) => d.geo).map((l) => ({ value: l, label: l }))[0].value;
	const [selectedOption, setSelectedOption] = useState<ISelectOption>();
	const [geoProxy, setGeoProxy] = useState<IProxyTarif[] | undefined>(data?.[0].proxy);

	useEffect(() => {
		setGeoProxy(data?.filter((p) => p.geo === selectedOption?.value)?.[0]?.proxy);
	}, [selectedOption]);

	useEffect(() => {
		initGeoValue && setSelectedOption({ value: initGeoValue, label: initGeoValue });
	}, [initGeoValue]);

	return (
		<div className={`TarifsList ${type === 'account' ? 'TarifsList-account' : ''}`}>
			<div className='TarifsList-select'>
				<ReactSelect
					type='geo'
					label={pageInterfaceText?.geo_text}
					placeholder={initGeoValue}
					defaultValue={selectedOption}
					onChange={setSelectedOption}
					options={data?.map((d) => d.geo).map((l) => ({ value: l, label: l }))}
				/>
			</div>
			<div className='TarifsList-cards'>
				{geoProxy?.length ? (
					<>
						{geoProxy.map((card) => (
							<TarifCard
								dataId={card.id}
								key={card.id}
								status={card.status}
								mark={card.mark}
								color={card.color}
								prices={card.prices}
								stats={card.stats}
								rent_terms={card.rent_terms}
								operators={card.operators}
							/>
						))}
					</>
				) : (
					<>
						<TarifCard className='loading' />
						<TarifCard className='loading' />
						<TarifCard className='loading' />
					</>
				)}
			</div>
		</div>
	);
};
