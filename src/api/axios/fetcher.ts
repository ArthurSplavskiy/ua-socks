import { IHomeHero } from '@/interfaces/api';
import { AxiosResponse } from 'axios';
import axios from './';

export const fetcher = (url: string) =>
	axios.get(url).then((res: any) => {
		res.json();
	});
