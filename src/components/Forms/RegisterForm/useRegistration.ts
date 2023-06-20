import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { getApiError, notValidForm } from '@/helpers/index';
import { TRegistrationPostData } from '@/interfaces/shared';
import { useComparePasswordFields } from '@/hooks/useTextInput/useComparePasswordFields';
import { FormEvent, useState } from 'react';
import { errorsMessages } from '@/hooks/useTextInput/validators';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';
import api from '@/api';

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setConfirmEmailSendedMessagePopup } = usePublicPopups((state) => state);

  const formData = {
    email: useTextInput({ validators: ['email'], isRequired: true }),
    password: useTextInput({
      validators: ['password'],
      isRequired: true
    }),
    confirm_password: useTextInput({
      validators: ['password'],
      isRequired: true,
      notEqualErrText: errorsMessages.PASSWORD_NOT_MATCH
    })
  };

  useComparePasswordFields({ pass: formData.password, confirmPass: formData.confirm_password });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      const data: Partial<TRegistrationPostData> = {
        email: formData.email.value || '',
        password: formData.password.value || '',
        password_confirmation: formData.confirm_password.value || ''
      };
      const res = await api.auth.registration(data, 'uk');
      await api.auth.verifyEmail(data.email || '', 'uk');

      setIsLoading(false);

      setConfirmEmailSendedMessagePopup({
        isOpen: true,
        message: res.data.message.replace(`/uk/resending-verify/${data.email}`, '#login')
      });

      // setTimeout(() => {
      //   setConfirmEmailSendedMessagePopup({ isOpen: false });
      //   openLogin();
      // }, 3000);
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
