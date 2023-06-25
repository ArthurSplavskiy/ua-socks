import { TLoginPostData } from '@/interfaces/shared';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import axios from 'axios';
import api from '@/api';

export const login = async (data: TLoginPostData) => {
  const { setErrorMessagePopup } = usePrivatePopups((state) => state);
  try {
    const res = await api.auth.login(data, 'uk');
    localStorage.setItem('acc-id', data.password);
    localStorage.setItem('user-email', data.password);
    localStorage.setItem('auth-token', res.data.token);
    const refreshRes = await axios.put(
      `${import.meta.env.VITE_API_URL}/uk/refresh`,
      {},
      { headers: { ['Authorization']: `Bearer ${res.data.token}` } }
    );
    localStorage.setItem('refresh-token', refreshRes.data.token);
    // getProfileData();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setErrorMessagePopup({
        isOpen: true,
        message: error?.response?.data.message.replace('\\', '')
      });
    }
  }
};
