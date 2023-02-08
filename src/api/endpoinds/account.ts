import { TBalancePostData } from '@/interfaces/shared';
import axios from '../axios';

const endpoints = {
	setBalance: (data: TBalancePostData) => axios.post('/balance', data),
	getPaymentMethods: import.meta.env.VITE_API_URL + '/payment_methods'
};

export default endpoints;
