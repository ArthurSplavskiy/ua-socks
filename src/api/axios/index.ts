import axios from 'axios';
import api from '..';
import { logout } from '../logout';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL // https://nestjs-boilerplate-test.fly.dev/api
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const authToken = localStorage.getItem('auth-token');

    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken.replaceAll('"', '')}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error: any) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        // const res = await axios.put(
        //   `${import.meta.env.VITE_API_URL}/uk/refresh`,
        //   {},
        //   {
        //     headers: {
        //       ['Authorization']: `Bearer ${localStorage.getItem('auth-token')?.replaceAll('"', '')}`
        //     }
        //   }
        // );
        console.log('HERE');
        const res = await api.auth.refreshLogin(
          {
            email: JSON.parse(localStorage.getItem('user-email') || ''),
            password: JSON.parse(localStorage.getItem('acc-id') || '')
          },
          'uk'
        );

        localStorage.setItem('auth-token', res.data.token);

        const refreshRes = await axios.put(
          `${import.meta.env.VITE_API_URL}/uk/refresh`,
          {},
          { headers: { ['Authorization']: `Bearer ${res.data.token}` } }
        );

        localStorage.setItem('auth-token', refreshRes.data.token);

        localStorage.setItem('auth-token', res.data.token.replace('"', ''));
        return axiosInstance.request(originalRequest);
      } catch (e) {
        logout();
        console.log('Unauth');
      }
    }
    throw error;
  }
);

export default axiosInstance;
