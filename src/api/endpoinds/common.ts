const endpoints = {
	//getPageInterfaceText: () => axios.get('/interface')
	getPageInterfaceText: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/interface`
};

export default endpoints;
