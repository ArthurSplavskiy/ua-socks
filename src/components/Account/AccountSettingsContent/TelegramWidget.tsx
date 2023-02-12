import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { useProfile } from '@/context/UserContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';

export const TelegramWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { openError, setError, pageInterfaceText } = useCommon();
	const { user } = useProfile();

	const formData = {
		telegram: useTextInput({ isRequired: false })
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
