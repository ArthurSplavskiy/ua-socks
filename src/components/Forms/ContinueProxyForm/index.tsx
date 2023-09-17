import { Button } from '@/components/shared/Button';
import { useContinue } from './useContinue';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import { useDevice } from '@/context/DeviceContext';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import api from '@/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { useEffect, useState } from 'react';
import { IProxy } from '@/interfaces/shared';
import { IRegionTariffs } from '@/components/Account/AccountBuyContent/interfaces';

export const ContinueForm = () => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { onSubmit, formData, formattingOptions, notEnoughMoney } = useContinue();
  const { isMobile } = useDevice();
  const location = useLocation();
  const { setSuccessMessagePopup: setPublicPopup } = usePublicPopups((state) => state);
  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);
  // const {
  // 	state: { openAddToBalancePopup }
  // } = useAccount();
  const { user, setUser } = useProfile();
  const queryClient = useQueryClient();
  const { getProfileData } = useProfile();
  const contractIds = [...(user?.select_contracts || []), ...(user?.select_single_contracts || [])];
  const contractIdsWithoutDublicate = [...new Set(contractIds)];

  const mutation = useMutation({
    mutationFn: () =>
      api.account.buyRenewalProxy('uk', {
        contract_id: contractIdsWithoutDublicate,
        // @ts-ignore
        term: +formData.time.value === 0 ? +formattingOptions?.[0]?.value : +formData.time.value
      }),
    onError: (data) => {
      setErrorMessagePopup({
        isOpen: true,
        // @ts-ignore
        message: data?.response?.data?.message || 'Something went wrong'
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('account.proxyList');
      getProfileData();

      if (data.status) {
        if (location.pathname === '/') {
          setPublicPopup({ isOpen: true, message: data?.data?.['0']?.message || 'Успішно' });
        } else {
          setSuccessMessagePopup({
            isOpen: true,
            message: data?.data?.['0']?.message || 'Успішно'
          });
        }
      } else {
        setErrorMessagePopup({
          isOpen: true,
          message: data?.data?.message || 'Something went wrong'
        });
      }
    }
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className='AccountPopup ContinuePopup'>
      <h3 className='AccountPopup-title'>{pageInterfaceText?.acc_continue_proxy}</h3>
      <form className='ContinuePopup-form' onSubmit={onSubmit}>
        <div className='ContinuePopup-form-wrap'>
          <fieldset className='ContinuePopup-form-field'>
            {formattingOptions && (
              <>
                <ReactSelect
                  type='usual'
                  label={pageInterfaceText?.acc_access_period}
                  defaultValue={formattingOptions?.[0]}
                  onChange={formData.time.onChange}
                  options={formattingOptions}
                />
                {notEnoughMoney && (
                  <span className='InputField-error-message'>
                    Недостатньо коштів на вашому балансі
                  </span>
                )}
              </>
            )}
            {!isMobile && (
              <Button type='submit' disabled={notEnoughMoney} onClick={handleClick}>
                {pageInterfaceText?.acc_continue_btn}
              </Button>
            )}
          </fieldset>
          {/* <fieldset className='ContinuePopup-form-field'>
            {!isMobile && <label className='InputField-label'>{pageInterfaceText?.acc_paid}</label>}
            <div className='ContinuePopup-price'>
              {isMobile && (
                <label className='InputField-label'>{pageInterfaceText?.acc_paid}:</label>
              )}
              <div className='ContinuePopup-price-inner'>
                <span className='ContinuePopup-price-currency'>$</span>
                <span className='ContinuePopup-price-sum'>
                  {formData.time.value ? formData.time.value : formattingOptions?.[0].value}
                </span>
              </div>
            </div>
          </fieldset> */}
          {isMobile && (
            <Button type='submit' disabled={notEnoughMoney} onClick={handleClick}>
              {pageInterfaceText?.acc_continue_btn}
            </Button>
          )}
        </div>
        {/* <Button onClick={openAddToBalancePopup}>{pageInterfaceText?.acc_payment_btn_text}</Button> */}
      </form>
    </div>
  );
};
