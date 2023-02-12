import { TBalancePostData } from '@/interfaces/shared';
import axios from '../axios';

const endpoints = {
	setBalance: (data: TBalancePostData) => axios.post('/balance', data),
	getPaymentMethods: import.meta.env.VITE_API_URL + '/payment_methods',
	getExportSetting: import.meta.env.VITE_API_URL + '/export_setting',
	getExportFormats: import.meta.env.VITE_API_URL + '/export_formats',
	getAccessPeriod: import.meta.env.VITE_API_URL + '/access_period'
};

export default endpoints;
