import axios from '../axios';

const endpoints = {
	//getPageInterfaceText: () => axios.get('/interface')
	getPageInterfaceText: import.meta.env.VITE_API_URL + '/interface'
};

export default endpoints;
