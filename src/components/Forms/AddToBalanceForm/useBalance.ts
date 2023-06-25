import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { TBalancePostData } from '@/interfaces/shared';
import { useAccount } from '@/context/Account/AccountContextHooks';

export const useBalance = () => {
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
      getApiError(error, formData);
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
