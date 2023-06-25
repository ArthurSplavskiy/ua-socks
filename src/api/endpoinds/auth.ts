import { TLoginPostData, TLogoutPostData, TRegistrationPostData } from '@/interfaces/shared';
import { APIResponse } from '../interfaces';
import axiosInstance from '../axios';
import axios from 'axios';

const endpoints = {
  registration: (data: Partial<TRegistrationPostData>, lang: string) =>
    axiosInstance.post<APIResponse>(`${lang}/register`, data),
  verifyEmail: (email: string, lang: string) =>
    axiosInstance.post<APIResponse>(`${lang}/resending-verify`, { email }),
  login: (data: TLoginPostData, lang: string) => axiosInstance.post(`${lang}/login`, data),
  refreshLogin: (data: TLoginPostData, lang: string) =>
    axios.post(`${lang}/login`, data, {
      baseURL: import.meta.env.VITE_API_URL
    }),
  logout: (data: TLogoutPostData, lang: string) => axiosInstance.post(`${lang}/logout`, data),
  refresh: (lang: string) => axiosInstance.put(`${lang}/refresh`),
  forgotPassword: (data: any, lang: string) => axiosInstance.post(`${lang}/forgot-password`, data),

  updateProfile: (data: any) => axiosInstance.patch('/v1/auth/me', data),
  getProfile: (lang: string) => axiosInstance.get(`${lang}/settings`)
};

export default endpoints;
