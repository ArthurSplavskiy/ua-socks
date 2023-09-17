import { IUserProfile } from '@/interfaces/api';
import {
  TBalancePostData,
  IUpdateAccountEmail,
  IUpdateAccountPwd,
  IProxy,
  IPayment
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
  buyPackage: async (lang: string, packageIds: { package_id: number[] }) => {
    const res = await axios.post(`/${lang}/buy-packages`, packageIds);
    return res;
  },
  renewalProxy: async (lang: string, data: { contract_id: number[]; renewal: 0 | 1 }) => {
    const res = await axios.put(`/${lang}/renewal-proxy`, data);
    return res;
  },
  buyRenewalProxy: async (lang: string, data: { contract_id: number[]; term: number }) => {
    const res = await axios.put(`/${lang}/buy-renewal-proxy`, data);
    return res;
  },
  exportProxy: async (lang: string, contract_id: number) => {
    const res = await axios.get(`/${lang}/export-proxy/${contract_id}`);
    return res;
  },
  pay: async (lang: string, payment: IPayment) => {
    const res = await axios.post(`/${lang}/initiate-payment`, payment);
    return res.data;
  },
  getGateways: async (lang: string) => {
    const res = await axios.get(`/${lang}/gateways`);
    return res.data;
  }
};

export default endpoints;
