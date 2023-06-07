import { IUserProfile } from '@/interfaces/api';
import { TBalancePostData } from '@/interfaces/shared';
import axios from '../axios';

const endpoints = {
	setBalance: (data: TBalancePostData, lang: string) => axios.post(`/${lang}/update/balance`, data),
	updateProfile: (data: IUserProfile, lang: string) => axios.post(`/${lang}/profile`, data),
	getPaymentMethods: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/payment_methods`,
	getExportSetting: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/export_setting`,
	getExportFormats: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/export_formats`,
	getAccessPeriod: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/access_period`
};

export default endpoints;
