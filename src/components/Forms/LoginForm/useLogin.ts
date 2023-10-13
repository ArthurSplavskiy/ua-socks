import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TLoginPostData } from '@/interfaces/shared';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { notValidForm, getApiError } from '@/helpers';
import { useProfile } from '@/context/UserContext';
import { useLocalStorage } from 'usehooks-ts';
import { AppRoutes } from '@/routes/AppRouter';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';
import axios from 'axios';
import api from '@/api';

export const useLogin = () => {
  const navigate = useNavigate();
  const { getProfileData } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [, setUserPWD] = useLocalStorage('acc-id', '');
  const [, setUserEmail] = useLocalStorage('user-email', '');
  const [, setAuthToken] = useLocalStorage('auth-token', '');
  const [, setRefreshToken] = useLocalStorage('refresh-token', '');
  const { setSuccessLoginMessagePopup } = usePrivatePopups((state) => state);
  const { setErrorMessagePopup } = usePublicPopups((state) => state);

  const formData: any = {
    email: useTextInput({ validators: ['email'] }),
    password: useTextInput({ validators: ['password'] })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      const data: TLoginPostData = {
        email: formData.email.value || '',
        password: formData.password.value || ''
      };
      const res = await api.auth.login(data, 'uk');
      setUserPWD(formData.password.value);
      setUserEmail(formData.email.value);
      setAuthToken(res.data.token);

      const refreshRes = await axios.put(
        `${import.meta.env.VITE_API_URL}/uk/refresh`,
        {},
        { headers: { ['Authorization']: `Bearer ${res.data.token}` } }
      );
      setRefreshToken(refreshRes.data.token);

      setIsLoading(false);
      navigate(AppRoutes.ACCOUNT_DASHBOARD);
      getProfileData();
      setSuccessLoginMessagePopup({ isOpen: true, message: res.data.message });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // if (error?.response?.status === 403) {
        //   setIsLoginResponse(error?.response?.data.message.replace('\\', ''));
        //   openConfirmEmail();
        // }
        getApiError(error, formData);
        setErrorMessagePopup({
          isOpen: true,
          message: error?.response?.data.message.replace('\\', '')
        });
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessLoginMessagePopup({ isOpen: false });
      }, 2000);
    }
  };

  return {
    formData,
    onSubmit,
    isLoading
  };
};
