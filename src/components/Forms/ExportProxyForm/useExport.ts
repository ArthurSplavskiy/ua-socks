import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { useCheckBoxGroupe } from '@/hooks/inputHooks/useCheckBoxGroupe';
import { useSelect } from '@/hooks/inputHooks/useSelect';
import api from '@/api';
import { useProfile } from '@/context/UserContext';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';

export const useExport = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { data: formats, isLoading: isLoadingFormats } = useRequest<ISelectOption[]>({
  //   method: 'GET',
  //   url: api.account.getExportFormats('uk')
  // });
  const { user } = useProfile();

  const { setExportProxyPopup, setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups(
    (state) => state
  );

  const formData = {
    format: useTextInput({ isRequired: true }),
    formatSelect: useSelect(),
    settings: useCheckBoxGroupe({ isRequired: true })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      // const data = {
      //   format: formData.format.value,
      //   formatSelect: formData.formatSelect.value, // || formats?.[0].value,
      //   settings: formData.settings.selectedCheckBoxes.current
      // };
      //console.log('exportData', data);
      // const res = await api.account.setBalance(data);
      // const resData = JSON.parse(res.config.data);
      // @ts-ignore
      const res = await api.account.exportProxy('uk', user?.select_export_contracts);

      console.log('res', res);
      const blob = new Blob([res?.data], { type: 'text/plain' });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ua-socks-proxy.txt';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // @ts-ignore
      setSuccessMessagePopup({ isOpen: true, message: res?.message || 'Успішно' });

      console.log('res', res);
      setIsLoading(false);
    } catch (error) {
      getApiError(error, formData);
      // @ts-ignore
      setErrorMessagePopup({ isOpen: true, message: error?.message || 'Успішно' });
      setTimeout(() => {
        setErrorMessagePopup({ isOpen: false });
      }, 2000);
    } finally {
      setIsLoading(false);
      setExportProxyPopup({ isOpen: false });
    }
  };

  return {
    formData,
    onSubmit,
    isLoading
  };
};
