import { FormEvent, useEffect, useState } from 'react';
import { notValidForm, getApiError, formatter } from '@/helpers';
import { useProfile } from '@/context/UserContext';
import { useCommon } from '@/context/CommonContext';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import api from '@/api';
import { ISelectOption, TBalancePostData } from '@/interfaces/shared';
import { useAccount } from '@/context/Account/AccountContextHooks';
import useRequest from '@/hooks/useRequest';
import { useSelect } from '@/hooks/inputHooks/useSelect';

export const useContinue = () => {
	const { openError, setError } = useCommon();
	const [isLoading, setIsLoading] = useState(false);
	const [formattingOptions, setFormattingOptions] = useState<ISelectOption[]>();
	const [notEnoughMoney, setNotEnoughMoney] = useState(false);
	const {
		state: { balance }
	} = useAccount();
	const formData = {
		time: useSelect<ISelectOption>({ value: formattingOptions?.[0].value })
	};
	const { data: options, isLoading: optionsIsLoading } = useRequest<ISelectOption[]>({
		method: 'GET',
		url: api.account.getAccessPeriod
	});

	useEffect(() => {
		if (options?.length) {
			setFormattingOptions(
				options.map((option) => ({
					label: formatter.format(Number(option.label)),
					value: option.value
				}))
			);
		}
	}, [options]);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			if (!formData.time.value) {
				if (Number(balance) < Number(formattingOptions?.[0].value)) {
					setNotEnoughMoney(true);
					return;
				} else {
					setNotEnoughMoney(false);
				}
			} else {
				if (Number(balance) < Number(formData.time.value)) {
					setNotEnoughMoney(true);
					return;
				} else {
					setNotEnoughMoney(false);
				}
			}

			console.log('balance', balance);
			console.log('data', formattingOptions?.[0].value);

			//const res = await api.account.setBalance(data);
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
		isLoading,
		formattingOptions,
		optionsIsLoading,
		notEnoughMoney
	};
};
