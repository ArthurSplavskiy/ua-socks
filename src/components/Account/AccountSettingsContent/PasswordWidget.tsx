import { Button } from '@/components/shared/Button';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { getApiError, notValidForm } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { FormEvent, useEffect, useState } from 'react';
import { useComparePasswordFields } from '@/hooks/useTextInput/useComparePasswordFields';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { errorsMessages } from '@/hooks/useTextInput/validators';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { useLocalStorage } from 'usehooks-ts';
import api from '@/api';

export const PasswordWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { text: pageInterfaceText } = useInterfaceText();
  const { user, setUser } = useProfile();
  const [currentPass, setCurrentPass] = useState('');
  const [, setUserPWD] = useLocalStorage('acc-id', '');
  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);

  const formData = {
    password_old: useTextInput({ value: currentPass || 'PasswordExample@' }),
    password: useTextInput({ validators: ['password'], isRequired: true }),
    confirm_password: useTextInput({
      validators: ['password'],
      isRequired: true,
      notEqualErrText: errorsMessages.PASSWORD_NOT_MATCH
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
      const res = await api.account.updatePwd('uk', {
        email: user.email,
        // @ts-ignore
        old_password: user.password,
        password: data.new_pass,
        password_confirmation: data.new_pass
      });
      setUserPWD(data.new_pass);
      setSuccessMessagePopup({ isOpen: true, message: res.data.message });
      const resData = JSON.parse(res.config.data);
      password.reset();
      confirm_password.reset();
      // @ts-ignore
      setUser((prev) => ({ ...prev, password: resData?.password || prev.password }));
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
    // @ts-ignore
    user?.password && setCurrentPass(user.password);
  }, [user]);

  return (
    <form onSubmit={onSubmit} className='PasswordWidget-form'>
      <PasswordField
        {...formData.password_old.inputProps}
        label={pageInterfaceText?.old_password}
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
