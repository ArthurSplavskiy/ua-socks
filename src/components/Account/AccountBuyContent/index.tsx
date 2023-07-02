import { TarifsList } from '@/components/TarifsList';
import { FC, useMemo, useState } from 'react';
import { IRegionTariffs } from './interfaces';
import { IProxyTarifList } from '@/interfaces/api';
import { useQuery } from 'react-query';
import api from '@/api';

export const AccountBuyContent: FC = () => {
  // const { data, response, isValidating, isLoading } = useRequest<IRegionTariffs>({
  //   method: 'GET',
  //   url: api.account.getRegionTariffs('uk', 1)
  // });

  const [regionId, setRegionId] = useState(1);
  const { data, isLoading } = useQuery<IRegionTariffs | undefined>(
    ['account.tariffs', regionId],
    () => api.account.getRegionTariffs('uk', regionId)
  );

  const proxyList: IProxyTarifList[] = useMemo(() => {
    if (!data) return [];

    const normalizeData = data.region_data.map((item) => {
      const proxyList = item.tariffs.map((tariff) => {
        const pricesList = tariff.packages.map((price) => ({
          active: !!price.package_status,
          total: +price.price,
          rent_term: String(price.package_term),
          operator: price.package_operator_name
        }));

        return {
          id: tariff.tariff_id,
          status: tariff.tariff_name,
          mark: false,
          // color: 'primary',
          operators: Object.values(item.operators[0]) as string[],
          rent_terms: Object.keys(item.terms[0]) as string[],
          prices: pricesList,
          stats: []
        };
      });

      return {
        geo: item.region_name,
        regionId: item.region_id,
        proxy: proxyList,
        isExistTariffs: !!item.tariffs.length
      };
    });

    return normalizeData;
  }, [data]);

  return (
    <>
      {proxyList.length && (
        <TarifsList
          data={proxyList}
          regionsSelect={data?.regions}
          setRegionId={setRegionId}
          type={'account'}
        />
      )}
    </>
  );
};
