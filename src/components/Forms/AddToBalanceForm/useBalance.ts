import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useProfile } from '@/context/UserContext';
import { useCommon } from '@/context/CommonContext';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import api from '@/api';
import { TBalancePostData } from '@/interfaces/shared';
import { useAccount } from '@/context/Account/AccountContextHooks';

export const useBalance = () => {
	const { openError, setError } = useCommon();
	const {
		state: { addToBalance }
	} = useAccount();
	const [isLoading, setIsLoading] = useState(false);
	const variantPrice = ['20', '50', '100', '300', '1000'];

	const formData = {
		balance: useTextInput({ validators: ['numberRange'], isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: TBalancePostData = {
				balance: formData.balance.value || ''
			};
			addToBalance(Number(data.balance));
			//const res = await api.account.setBalance(data);

			// const resData = JSON.parse(res.config.data);
			// setToken(res?.data?.accessToken);
			//getProfileData();

			setIsLoading(false);
			// setTimeout(() => {
			// 	setIsLoading(false);
			// 	openThank();
			// }, 300);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
			openError();
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		onSubmit,
		isLoading,
		variantPrice
	};
};
