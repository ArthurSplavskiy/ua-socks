import axios from '../axios';

const endpoints = {
	getPageInterfaceText: () => axios.get('/interface')
};

export default endpoints;
