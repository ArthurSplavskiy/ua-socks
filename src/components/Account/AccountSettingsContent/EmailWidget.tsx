import api from '@/api';
import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';

export const EmailWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { openError, setError } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { user, setUser } = useProfile();
	const [currentEmail, setCurrentEmail] = useState('');

	const formData = {
		current_email: useTextInput({ value: currentEmail || 'EmailExample@' }),
		email: useTextInput({ validators: ['email'], isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			if (!user) return;
			const res = await api.account.updateProfile({ ...user, email: formData.email.value }, 'en');
			const resData = JSON.parse(res.config.data);
			formData.email.reset();
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
		user?.email && setCurrentEmail(user.email);
	}, [user]);

	return (
		<form onSubmit={onSubmit} className='EmailWidget-form'>
			<InputField {...formData.current_email.inputProps} value={currentEmail} label={'E-mail'} />
			<InputField
				{...formData.email.inputProps}
				value={formData.email.value}
				label={pageInterfaceText?.form_email}
				errors={formData.email.errors}
			/>
			<Button type='submit' color='outline' loading={isLoading}>
				{pageInterfaceText?.save}
			</Button>
		</form>
	);
};
