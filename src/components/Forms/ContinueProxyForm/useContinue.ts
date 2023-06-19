import { FormEvent, useEffect, useState } from 'react';
import { notValidForm, getApiError, formatter } from '@/helpers';
import { ISelectOption } from '@/interfaces/shared';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useSelect } from '@/hooks/inputHooks/useSelect';
import useRequest from '@/hooks/useRequest';
import api from '@/api';

export const useContinue = () => {
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
    url: api.account.getAccessPeriod('uk')
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
      getApiError(error, formData);
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
