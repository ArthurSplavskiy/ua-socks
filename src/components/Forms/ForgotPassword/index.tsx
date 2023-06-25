import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { Link } from 'react-router-dom';
import { FormFooter } from '../FormFooter';
import { useInterfaceText } from '@/context/UserContext';
import { FormEvent, useState } from 'react';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { getApiError, notValidForm } from '@/helpers/index';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';
import axios from 'axios';
import api from '@/api';

export const ForgotPassword = () => {
  const { openRegistration } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { isMobile } = useDevice();

  const { setError, closeForgotPass, openLogin } = useCommon();
  const [isLoading, setIsLoading] = useState(false);
  // const [, setUserPWD] = useLocalStorage('acc-id', '');
  // const [, setUserEmail] = useLocalStorage('user-email', '');
  // const [, setAuthToken] = useLocalStorage('auth-token', '');
  const setNewPassSendedMessagePopup = usePublicPopups(
    (state) => state.setNewPassSendedMessagePopup
  );

  const formData = {
    email: useTextInput({ validators: ['email'], isRequired: true })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      const data = {
        email: formData.email.value || ''
      };
      const res = await api.auth.forgotPassword(data, 'uk');
      closeForgotPass();
      setNewPassSendedMessagePopup({ isOpen: true, message: res.data.message });
      setTimeout(() => {
        setNewPassSendedMessagePopup({ isOpen: false });
        openLogin();
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { msg } = getApiError(error, formData);
        setError({ type: 'error', text: msg || 'Error !' });
        //openError();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='AuthPopup'>
      <h3 className='AuthPopup-title'>{pageInterfaceText?.forgot_password}</h3>
      <p className='AuthPopup-subtitle'>{pageInterfaceText?.forgot_pass_info}</p>
      <span className='AuthPopup-info'>{pageInterfaceText?.spam_check}</span>
      <form className='AuthPopup-form' onSubmit={onSubmit}>
        <InputField
          {...formData.email.inputProps}
          value={formData.email.value}
          label={pageInterfaceText?.form_email}
          errors={formData.email.errors}
        />

        {isMobile && (
          <div className='FormFooter-policy'>
            Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
            <Link to='/'>політикою конфіденційності</Link> та{' '}
            <Link to='/'>угодою публічної оферти</Link>
          </div>
        )}

        <Button type='submit' color='primary' loading={isLoading}>
          {pageInterfaceText?.send}
        </Button>

        {isMobile && (
          <div className='FormFooter-link'>
            <div>{pageInterfaceText?.no_have_acc}</div>
            <button onClick={openRegistration}>{pageInterfaceText?.registration_link}</button>
          </div>
        )}
      </form>

      {!isMobile && (
        <FormFooter
          leftText={pageInterfaceText?.no_have_acc}
          rightText={pageInterfaceText?.registration_link}
          linkCallback={openRegistration}
        />
      )}
    </div>
  );
};
