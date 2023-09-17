import { FormEvent, useEffect, useState } from 'react';
import { notValidForm, getApiError, formatter } from '@/helpers';
import { ISelectOption } from '@/interfaces/shared';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useSelect } from '@/hooks/inputHooks/useSelect';
import { useQuery } from 'react-query';
import { IRegionTariffs } from '@/components/Account/AccountBuyContent/interfaces';
import api from '@/api';
import { useProfile } from '@/context/UserContext';

export const useContinue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formattingOptions, setFormattingOptions] = useState<ISelectOption[]>();
  const [notEnoughMoney, setNotEnoughMoney] = useState(false);
  const { user } = useProfile();
  const formData = {
    time: useSelect<ISelectOption>({ value: formattingOptions?.[0].value })
  };
  // const { data: options, isLoading: optionsIsLoading } = useRequest<ISelectOption[]>({
  //   method: 'GET',
  //   url: api.account.getAccessPeriod('uk')
  // });
  // const { data } = useQuery<IRegionTariffs | undefined>(['account.tariffs', regionId], () =>
  //   api.account.getRegionTariffs('uk', regionId)
  // );

  const options: ISelectOption[] = [
    { id: 0, value: '3', label: '3' },
    { id: 1, value: '7', label: '7' },
    { id: 2, value: '30', label: '30' }
  ];

  useEffect(() => {
    if (options?.length) {
      setFormattingOptions(
        options.map((option) => ({
          label: formatter.format(Number(option.label)),
          value: option.value
        }))
      );
    }
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      if (!formData.time.value) {
        if (Number(user?.wallet_balance) < Number(formattingOptions?.[0].value)) {
          setNotEnoughMoney(true);
          return;
        } else {
          setNotEnoughMoney(false);
        }
      } else {
        if (Number(user?.wallet_balance) < Number(formData.time.value)) {
          setNotEnoughMoney(true);
          return;
        } else {
          setNotEnoughMoney(false);
        }
      }

      // console.log('balance', user?.wallet_balance);
      // console.log('data', formattingOptions?.[0].value);

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
    notEnoughMoney
  };
};
