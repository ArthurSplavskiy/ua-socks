import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import api from '@/api';

export const EmailWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { text: pageInterfaceText } = useInterfaceText();
  const { user, setUser, logOut } = useProfile();
  const [currentEmail, setCurrentEmail] = useState('');
  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);

  const formData = {
    current_email: useTextInput({ value: currentEmail || 'EmailExample@' }),
    email: useTextInput({ validators: ['email'], isRequired: true })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      if (!user) return;
      const res = await api.account.updateEmail('uk', {
        // @ts-ignore
        password: user.password,
        email: formData.email.value,
        old_email: user.email
      });
      setSuccessMessagePopup({ isOpen: true, message: res.data.message });
      const resData = JSON.parse(res.config.data);
      formData.email.reset();
      // @ts-ignore
      setUser((prev) => ({ ...prev, email: resData?.email }));
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
    user?.email && setCurrentEmail(user.email);
  }, [user]);

  return (
    <form onSubmit={onSubmit} className='EmailWidget-form'>
      <InputField {...formData.current_email.inputProps} value={currentEmail} label={'E-mail'} />
      <InputField
        {...formData.email.inputProps}
        value={formData.email.value}
        label={pageInterfaceText?.form_email}
        errors={formData.email.errors}
      />
      <Button type='submit' color='outline' loading={isLoading}>
        {pageInterfaceText?.save}
      </Button>
    </form>
  );
};
