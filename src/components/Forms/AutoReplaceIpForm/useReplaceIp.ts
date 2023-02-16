import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useCommon } from '@/context/CommonContext';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';

export const useReplaceIp = () => {
	const { openError, setError } = useCommon();
	const [isLoading, setIsLoading] = useState(false);

	const formData = {
		time: useTextInput()
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			// formData.time.value
			// const res = await api.account.setBalance(data);
			// const resData = JSON.parse(res.config.data);
			setIsLoading(false);
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
		isLoading
	};
};
