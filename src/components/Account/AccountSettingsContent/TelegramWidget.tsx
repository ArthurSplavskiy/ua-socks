import api from '@/api';
import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';

export const TelegramWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { text: pageInterfaceText } = useInterfaceText();
  const { user, setUser } = useProfile();
  const [nickname, setNickname] = useState('');
  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);

  const formData = {
    telegram: useTextInput({ value: nickname, isRequired: false })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      const data = {
        telegram: formData.telegram.value || ''
      };
      if (!user) return;
      const res = await api.account.updateTelegram('uk', data.telegram);
      setSuccessMessagePopup({ isOpen: true, message: res.data.message });
      const resData = JSON.parse(res.config.data);
      // @ts-ignore
      setUser((prev) => ({
        ...prev,
        nickname_telegram: resData?.nickname_telegram || prev.nickname_telegram
      }));
    } catch (error) {
      getApiError(error, formData);
      setErrorMessagePopup({
        isOpen: true,
        // @ts-ignore
        message: error?.response?.data?.message || error?.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.nickname_telegram) {
      formData.telegram.setValue(user.nickname_telegram);
      setNickname(user.nickname_telegram);
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
