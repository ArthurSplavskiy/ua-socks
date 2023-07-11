import { IUserProfile } from '@/interfaces/api';
import {
  TBalancePostData,
  IUpdateAccountEmail,
  IUpdateAccountPwd,
  IProxy
} from '@/interfaces/shared';
import axios from '../axios';

const endpoints = {
  setBalance: (data: TBalancePostData, lang: string) => axios.post(`/${lang}/update/balance`, data),
  updateProfile: (data: IUserProfile, lang: string) => axios.post(`/${lang}/profile`, data),
  getPaymentMethods: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/payment_methods`,
  getExportSetting: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/export_setting`,
  getExportFormats: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/export_formats`,
  getAccessPeriod: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/access_period`,

  updateTelegram: (lang: string, payload: string) =>
    axios.put(`/${lang}/up-telegram`, { nickname_telegram: payload }),
  updateEmail: (lang: string, payload: IUpdateAccountEmail) =>
    axios.put(`/${lang}/reset-email`, payload),
  updatePwd: (lang: string, payload: IUpdateAccountPwd) =>
    axios.put(`/${lang}/reset-password`, payload),

  getRegionTariffs: async (lang: string, regionId: number = 1) => {
    const res = await axios.get(`/${lang}/list-packages?region_id=${regionId}`);
    return res.data;
  },
  getSupportData: async (lang: string) => {
    const res = await axios.get(`/${lang}/support`);
    return res.data;
  },
  getProxyList: async (lang: string) => {
    const res = await axios.get(`/${lang}/list-proxy`);
    return res.data;
  },
  buyPackage: async (lang: string, proxy: IProxy) => {
    const res = axios.post(`/${lang}/buy-package`, proxy);
    return res;
  }
};

export default endpoints;
