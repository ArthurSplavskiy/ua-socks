import { FormEvent, useState } from 'react';
import { notValidForm, getApiError } from '@/helpers';
import { useTextInput } from '@/hooks/useTextInput/useTextInput';
import { ISelectOption } from '@/interfaces/shared';
import { useCheckBoxGroupe } from '@/hooks/inputHooks/useCheckBoxGroupe';
import { useSelect } from '@/hooks/inputHooks/useSelect';
import useRequest from '@/hooks/useRequest';
import api from '@/api';

export const useExport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: formats, isLoading: isLoadingFormats } = useRequest<ISelectOption[]>({
    method: 'GET',
    url: api.account.getExportFormats('uk')
  });

  const formData = {
    format: useTextInput({ isRequired: true }),
    formatSelect: useSelect(),
    settings: useCheckBoxGroupe({ isRequired: true })
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (notValidForm(formData)) return;

    try {
      setIsLoading(true);
      const data = {
        format: formData.format.value,
        formatSelect: formData.formatSelect.value || formats?.[0].value,
        settings: formData.settings.selectedCheckBoxes.current
      };
      console.log('exportData', data);
      // const res = await api.account.setBalance(data);
      // const resData = JSON.parse(res.config.data);
      setIsLoading(false);
    } catch (error) {
      getApiError(error, formData);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    onSubmit,
    isLoading,
    isLoadingFormats,
    formats
  };
};
