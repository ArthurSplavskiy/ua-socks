import { TLoginPostData, TRegistrationPostData } from '@/interfaces/shared';
import axios from '../axios';

const endpoints = {
	registration: (data: Partial<TRegistrationPostData>) => axios.post('/register', data),
	login: (data: TLoginPostData) => axios.post('/login', data),
	forgotPassword: (data: any) => axios.post('/v1/auth/forgot/password', data),
	getProfile: () => axios.get('/v1/auth/me'),
	updateProfile: (data: any) => axios.patch('/v1/auth/me', data)
};

export default endpoints;
