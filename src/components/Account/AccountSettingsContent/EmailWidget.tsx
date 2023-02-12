import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useState } from 'react';

export const EmailWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { openError, setError, pageInterfaceText } = useCommon();

	const formData = {
		email: useTextInput({ validators: ['email'], isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			// const data: TBalancePostData = {
			// 	balance: formData.balance.value || ''
			// };
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

	return (
		<form onSubmit={onSubmit} className='EmailWidget-form'>
			<InputField
				{...formData.email.inputProps}
				value={formData.email.value}
				label={'E-mail'}
				errors={formData.email.errors}
			/>
			<InputField
				{...formData.email.inputProps}
				value={formData.email.value}
				label={pageInterfaceText?.form_email}
				errors={formData.email.errors}
			/>
			<Button type='submit' color='outline'>
				{pageInterfaceText?.save}
			</Button>
		</form>
	);
};
