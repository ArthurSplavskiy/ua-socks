import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';

export const useReplaceIp = () => {
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
      getApiError(error, formData);
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
