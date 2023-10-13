import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useReplaceIp } from './useReplaceIp';
import { useInterfaceText } from '@/context/UserContext';
import '../AccountForms.scss';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import './index.scss';

export const AutoReplaceIpForm = () => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { onSubmit, formData } = useReplaceIp();
  const { setAutoreplaceProxyPopup } = usePrivatePopups((state) => state);

  return (
    <div className={'AccountPopup ReplacePopup'}>
      <h3 className='AccountPopup-title'>{pageInterfaceText?.acc_auto_replace_ip}</h3>
      <div className='AccountPopup-info'>
        <form className='ReplacePopup-form' onSubmit={onSubmit}>
          <div className='ReplacePopup-form-btns'>
            <Button type='submit'>{pageInterfaceText?.apply}</Button>
            <Button
              type='submit'
              color='outline'
              onClick={() => {
                setAutoreplaceProxyPopup({ isOpen: false });
              }}>
              {pageInterfaceText?.cancel}
            </Button>
          </div>
          <div className='autoreplace'>
            <InputField
              {...formData.time.inputProps}
              placeholder={'1 - 60'}
              rightPrefix={'хв'}
              minLength={1}
              maxLength={2}
              errors={formData.time.errors}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
