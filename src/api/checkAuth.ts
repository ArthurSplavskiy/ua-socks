import axios from 'axios';

export const checkAuth = async () => {
	try {
		const res = await axios.put(
			`${import.meta.env.VITE_API_URL}/uk/refresh`,
			{},
			{
				headers: {
					['Authorization']: `Bearer ${localStorage.getItem('auth-token')?.replaceAll('"', '')}`
				}
			}
		);
		localStorage.setItem('auth-token', res.data.token.replace('"', ''));
	} catch (e) {
		console.log('Unauth');
	}
}