import { Button } from '@/components/shared/Button';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { useCommon } from '@/context/CommonContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useState } from 'react';
import { useComparePasswordFields } from '@/hooks/useTextInput/useComparePasswordFields';

export const PasswordWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { openError, setError, pageInterfaceText } = useCommon();

	const formData = {
		password_old: useTextInput({ validators: ['password'], isRequired: true }),
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
		<form onSubmit={onSubmit} className='PasswordWidget-form'>
			<PasswordField
				{...formData.password_old.inputProps}
				label={pageInterfaceText?.form_password}
				errors={formData.password.errors}
				autoComplete='new-password'
			/>
			<PasswordField
				{...formData.password.inputProps}
				label={pageInterfaceText?.form_password}
				errors={formData.password.errors}
				autoComplete='new-password'
			/>
			<PasswordField
				{...formData.confirm_password.inputProps}
				label={pageInterfaceText?.form_repeat_password}
				errors={formData.confirm_password.errors}
				autoComplete='new-password'
			/>
			<Button type='submit' color='outline'>
				{pageInterfaceText?.save}
			</Button>
		</form>
	);
};
