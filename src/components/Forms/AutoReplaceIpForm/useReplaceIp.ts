import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import api from '@/api';
import { useProfile } from '@/context/UserContext';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';

export const useReplaceIp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useProfile();
  const contractIds = [...(user?.select_contracts || []), ...(user?.select_single_contracts || [])];
  const contractIdsWithoutDublicate = [...new Set(contractIds)];
  const { setErrorMessagePopup, setSuccessMessagePopup, setAutoreplaceProxyPopup } =
    usePrivatePopups((state) => state);

  const formData = {
    time: useTextInput({ isRequired: true, validators: ['minuteRange'] })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;
    try {
      setIsLoading(true);

      const res = await api.account.autoReplaceIp('uk', {
        contract_id: contractIdsWithoutDublicate[0],
        changeIpDelayMin: +formData.time.value
      });
      if (res?.status) {
        //queryClient.invalidateQueries('account.proxyList');
        // getProfileData();
        setSuccessMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: res?.message || 'Успішно'
        });
        setTimeout(() => {
          setSuccessMessagePopup({ isOpen: false });
        }, 2000);
      } else {
        setErrorMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: res?.data?.message || 'Something went wrong'
        });
      }
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      if (error?.response?.data?.message) {
        setErrorMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: error?.response?.data?.message || 'Something went wrong'
        });
      }
      getApiError(error, formData);
    } finally {
      setIsLoading(false);
      setAutoreplaceProxyPopup({ isOpen: false });
    }
  };

  return {
    formData,
    onSubmit,
    isLoading
  };
};
