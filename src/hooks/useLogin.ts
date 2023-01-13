import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRouter';
import { TLoginPostData } from '@/interfaces/shared';
import api from '@/api';
import { useTextInput } from './useTextInput/useTextInput';
import { notValidForm, getApiError } from '@/helpers';
import { useProfile } from '@/context/UserContext';

export const useLogin = () => {
	const navigate = useNavigate();
	const { setToken } = useProfile();
	//const { getUser } = useContextProfile();
	//const { call, isLoading } = useHttp();
	//const [rememberMe, setRememberMe] = useState(false);

	const formData = {
		email: useTextInput({ validators: ['email'] }),
		password: useTextInput({ validators: ['password'] })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			const data: TLoginPostData = {
				email: formData.email.value || '',
				password: formData.password.value || ''
			};
			//const res = await call(auth.login(data));
			//rememberAuthData({ rememberMe, data: res?.data });
			console.log('login data', data);
			const res = await api.auth.login(data);

			//await getUser?.();
			navigate(AppRoutes.ACCOUNT);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			console.log('msg', msg);
			//eventBus.dispatch('showToast', { type: 'error', text: msg || 'Error !' });
		}
	};

	return {
		formData,
		onSubmit
		// isLoading,
		// rememberMe,
		// setRememberMe
	};
};
