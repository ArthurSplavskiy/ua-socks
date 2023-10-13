import { FormEvent, useState } from 'react';
import { notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { IPayment, ISelectOption } from '@/interfaces/shared';
import api from '@/api';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';

interface Props {
  payment?: ISelectOption;
}

export const useBalance = ({ payment }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);
  const variantPrice = ['20', '50', '100', '300', '1000'];
  const [liqpayResponse, setLiqpayResponse] = useState<{ data: string; signature: string } | null>(
    null
  );

  const formData = {
    balance: useTextInput({ validators: ['numberRange'], isRequired: true })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      const data: IPayment = {
        currency: 'USD',
        amount: +formData.balance.value || 0,
        // @ts-ignore
        payment_gateway: payment?.value || payment
      };
      // @ts-ignore
      //addToBalance(Number(data.balance));
      //const res = await api.account.setBalance(data);

      // const resData = JSON.parse(res.config.data);
      // setToken(res?.data?.accessToken);
      //getProfileData();
      //console.log('data', data);

      const res = await api.account.pay('uk', data);
      console.log('payment res', res);

      if (res?.error?.response?.errors?.amount?.[0]) {
        formData?.['balance']?.setErrors(res?.error?.response?.errors?.amount as string[]);
        return;
      }

      if (data.payment_gateway === 'capitalist' || data.payment_gateway === 'whitepay') {
        window.location.href = res?.payment_url;
        console.log('res?.data.payment_url', res.payment_url);
      } else {
        setLiqpayResponse(res);
      }

      //setSuccessMessagePopup({ isOpen: true, message: res.message || 'Успіх' });
      if (res?.message) {
        console.log('here');
        setErrorMessagePopup({
          isOpen: true,
          message: res.message
        });
      }

      //setIsLoading(false);
      // setTimeout(() => {
      // 	setIsLoading(false);
      // 	openThank();
      // }, 300);
    } catch (error) {
      //getApiError(error, formData);
      setErrorMessagePopup({
        isOpen: true,
        // @ts-ignore
        message: error?.response?.data?.message || error?.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    onSubmit,
    isLoading,
    variantPrice,
    liqpayResponse
  };
};
