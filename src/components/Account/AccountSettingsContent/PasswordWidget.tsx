import { Button } from '@/components/shared/Button';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { useCommon } from '@/context/CommonContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';
import { useComparePasswordFields } from '@/hooks/useTextInput/useComparePasswordFields';
import { useProfile } from '@/context/UserContext';
import api from '@/api';

export const PasswordWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { openError, setError, pageInterfaceText } = useCommon();
	const { user, setUser } = useProfile();
	const [currentPass, setCurrentPass] = useState('');

	const formData = {
		password_old: useTextInput(),
		password: useTextInput({ validators: ['password'], isRequired: true }),
		confirm_password: useTextInput({
			validators: ['password'],
			isRequired: true
		})
	};
	const { password, confirm_password } = formData;

	useComparePasswordFields({ pass: formData.password, confirmPass: formData.confirm_password });

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data = {
				new_pass: formData.confirm_password.value || ''
			};
			if (!user) return;
			const res = await api.account.updateProfile({ ...user, password: data.new_pass });
			const resData = JSON.parse(res.config.data);
			password.setValue('');
			confirm_password.setValue('');
			setTimeout(() => {
				password.setErrors([]);
				confirm_password.setErrors([]);
			}, 0);
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
		user?.password && setCurrentPass(user.password);
	}, [user]);

	return (
		<form onSubmit={onSubmit} className='PasswordWidget-form'>
			<PasswordField
				{...formData.password_old.inputProps}
				label={pageInterfaceText?.old_password}
				autoComplete='new-password'
				value={currentPass}
			/>
			<PasswordField
				{...formData.password.inputProps}
				label={pageInterfaceText?.new_password}
				errors={formData.password.errors}
				autoComplete='new-password'
			/>
			<PasswordField
				{...formData.confirm_password.inputProps}
				label={pageInterfaceText?.form_repeat_password}
				errors={formData.confirm_password.errors}
				autoComplete='new-password'
			/>
			<Button type='submit' color='outline' loading={isLoading}>
				{pageInterfaceText?.save}
			</Button>
		</form>
	);
};
