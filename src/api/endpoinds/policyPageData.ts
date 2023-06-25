const endpoints = {
	getPolicyData: (lang: string) => import.meta.env.VITE_API_URL + `/${lang}/policy`
};

export default endpoints;
