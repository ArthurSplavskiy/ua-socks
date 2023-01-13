import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/context/UserContext';
import { useTextInput } from './useTextInput/useTextInput';
import { AppRoutes } from '@/routes/AppRouter';
import { getApiError, notValidForm } from '@/helpers/index';
import { TRegistrationPostData } from '@/interfaces/shared';
import { useComparePasswordFields } from './useTextInput/useComparePasswordFields';
import api from '@/api';
import { FormEvent } from 'react';
import { useCommon } from '@/context/CommonContext';
import { eventBus } from '@/helpers/EventBus/EventBus';

export const useRegistration = () => {
	const navigate = useNavigate();
	const { user } = useProfile();
	const { openLogin } = useCommon();
	const { setToken } = useProfile();
	//const { call, isLoading } = useHttp();

	const formData = {
		email: useTextInput({ validators: ['email'], isRequired: true }),
		password: useTextInput({ validators: ['password'], isRequired: true }),
		confirm_password: useTextInput({
			validators: ['password'],
			isRequired: true
		})
	};

	useComparePasswordFields({ pass: formData.password, confirmPass: formData.confirm_password });

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			const data: Partial<TRegistrationPostData> = {
				email: formData.email.value || '',
				password: formData.password.value || ''
			};
			console.log('register data', data);
			const res = await api.auth.registration(data);
			console.log('register res', res);
			setToken(res?.data?.accessToken);
			openLogin();
			//await getUser?.();
			//navigate(AppRoutes.ACCOUNT);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			console.log('msg', msg);
			eventBus.dispatch('showErrorPopup', { type: 'error', text: msg || 'Error !' });
		}
	};

	return {
		formData,
		onSubmit
		//isLoading,
	};
};
