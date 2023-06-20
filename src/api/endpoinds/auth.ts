import { TLoginPostData, TLogoutPostData, TRegistrationPostData } from '@/interfaces/shared';
import { APIResponse } from '../interfaces';
import axios from '../axios';

const endpoints = {
  registration: (data: Partial<TRegistrationPostData>, lang: string) =>
    axios.post<APIResponse>(`${lang}/register`, data),
	verifyEmail: (email: string, lang: string) =>
	axios.post<APIResponse>(`${lang}/resending-verify`, { email }),
  login: (data: TLoginPostData, lang: string) => axios.post(`${lang}/login`, data),
  logout: (data: TLogoutPostData, lang: string) => axios.post(`${lang}/logout`, data),
  refresh: (lang: string) => axios.put(`${lang}/refresh`),
  forgotPassword: (data: any, lang: string) => axios.post(`${lang}/forgot-password`, data),

  updateProfile: (data: any) => axios.patch('/v1/auth/me', data),
  getProfile: (lang: string) => axios.get(`${lang}/settings`)
};

export default endpoints;
