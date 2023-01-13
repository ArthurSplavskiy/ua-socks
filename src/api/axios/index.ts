import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3030' // https://nestjs-boilerplate-test.fly.dev/api
});

axiosInstance.interceptors.request.use(
	(config: any) => {
		const authToken = Cookies.get('auth-token');

		if (authToken) {
			config.headers['Authorization'] = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
