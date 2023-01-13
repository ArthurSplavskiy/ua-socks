import axios from '../axios';

const endpoints = {
	getMenuList: () => axios.get('/menu')
};

export default endpoints;
