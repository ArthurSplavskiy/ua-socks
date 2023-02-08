const endpoints = {
	//getMenuList: () => axios.get('/menu'),
	getMenuList: import.meta.env.VITE_API_URL + '/menu',
	getHeroData: import.meta.env.VITE_API_URL + '/home_hero',
	getAdvantages: import.meta.env.VITE_API_URL + '/home_advantages',
	getSpeed: import.meta.env.VITE_API_URL + '/home_speed',
	getTarifsTitle: import.meta.env.VITE_API_URL + '/home_tarifs',
	getTarifsCards: import.meta.env.VITE_API_URL + '/proxy_tarifs',
	getUsage: import.meta.env.VITE_API_URL + '/home_usage',
	getSocial: import.meta.env.VITE_API_URL + '/home_social',
	getFaqs: import.meta.env.VITE_API_URL + '/home_faq',
	getQuestion: import.meta.env.VITE_API_URL + '/home_question',
	getFooterData: import.meta.env.VITE_API_URL + '/footer_links'
};

export default endpoints;
