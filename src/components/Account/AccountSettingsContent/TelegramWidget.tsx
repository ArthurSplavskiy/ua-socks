import api from '@/api';
import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';

export const TelegramWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { openError, setError } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { user, setUser } = useProfile();

	const formData = {
		telegram: useTextInput({ isRequired: false })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data = {
				telegram: formData.telegram.value || ''
			};
			if (!user) return;
			const res = await api.account.updateProfile({ ...user, telegram: data.telegram }, 'en');
			const resData = JSON.parse(res.config.data);
			setUser(resData);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
			openError();
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (user?.telegram) {
			formData.telegram.setValue(user.telegram);
		}
	}, [user]);

	return (
		<form onSubmit={onSubmit} className='TelegramWidget-form'>
			<InputField
				{...formData.telegram.inputProps}
				type='text'
				value={formData.telegram.value}
				label={'Telegram'}
				errors={formData.telegram.errors}
			/>
			<Button type='submit' color='outline' loading={isLoading}>
				{pageInterfaceText?.save}
			</Button>
		</form>
	);
};
