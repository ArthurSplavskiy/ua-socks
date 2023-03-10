import { dataOrEmptyArray } from '@/helpers';
import { IMenu } from '@/interfaces/shared';
import { IDataHooks } from '@/interfaces/shared';
import { useCallback, useEffect, useState } from 'react';
import api from '../';

export const useMenuList = (): IDataHooks<IMenu[]> => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState('');
	const [data, setData] = useState<IMenu[]>();

	const loadData = useCallback(async () => {
		try {
			setIsLoading(true);
			//const { data } = await api.homePage.getMenuList();
			//setData(data);
		} catch {
			setIsError('Something went wrong :(');
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 200);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return {
		data: dataOrEmptyArray(data),
		isLoading,
		isError
	};
};
