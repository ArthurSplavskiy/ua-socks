import { FC, memo, useEffect } from 'react';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { AddToBalanceForm } from '../Forms/AddToBalanceForm';
import { Background } from '../shared/Background';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { AccountPopupsBg } from '../shared/Background/AccountPopupsBg';
import { AutoReplaceIpForm } from '../Forms/AutoReplaceIpForm';
import { ExportForm } from '../Forms/ExportProxyForm';
import { ContinueForm } from '../Forms/ContinueProxyForm';
import { useInterfaceText } from '@/context/UserContext';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { FormsBg } from '../shared/Background/FormsBg';
import { Icon } from '../shared/Icon/Icon';

export const PrivatePopups: FC = memo(() => {
  const { text: pageInterfaceText } = useInterfaceText();
  const { isPopupHide, popupHide } = useAccount();

  const {
    successLoginMessagePopup,
    setSuccessLoginMessagePopup,

    errorMessagePopup,
    setErrorMessagePopup,

    successMessagePopup,
    setSuccessMessagePopup,

    addToBalancePopup,
    setAddToBalancePopup,

    exportProxyPopup,
    setExportProxyPopup,

    continueProxyPopup,
    setContinueProxyPopup,

    autoreplaceProxyPopup,
    setAutoreplaceProxyPopup
  } = usePrivatePopups((state) => state);

  useEffect(() => {
    // @ts-ignore
    let id = null;
    if (successMessagePopup.isOpen) {
      id = setTimeout(() => {
        setSuccessMessagePopup({ isOpen: false });
      }, 2000);
    } else {
      if (id) {
        clearTimeout(id);
      }
    }
    return () => {
      // @ts-ignore
      if (id) {
        clearTimeout(id);
      }
    };
  }, [successMessagePopup]);

  return (
    <>
      {/* Thank popup */}
      <ModalPopup
        show={successLoginMessagePopup.isOpen}
        withBackdrop={false}
        onClose={() => {
          setSuccessLoginMessagePopup({ isOpen: false });
        }}>
        <TemplateModal
          color='primary'
          className='TemplateModal-message'
          title={pageInterfaceText?.thank_text}
          subTitle={successLoginMessagePopup?.message}
          background={<Background particleColor='primary' particleCount='few' color='white' />}
        />
      </ModalPopup>

      {/* Add Balance popup */}
      <ModalPopup
        show={addToBalancePopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setAddToBalancePopup({ isOpen: false });
          // closeAddToBalancePopup();
          popupHide(false);
        }}>
        <TemplateModal background={<AccountPopupsBg />}>
          <AddToBalanceForm />
        </TemplateModal>
      </ModalPopup>

      {/* Proxy continue popup */}
      <ModalPopup
        show={autoreplaceProxyPopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setAutoreplaceProxyPopup({ isOpen: false });
          //popupHide(false);
        }}>
        <TemplateModal background={<AccountPopupsBg />}>
          <AutoReplaceIpForm />
        </TemplateModal>
      </ModalPopup>

      {/* Proxy export popup */}
      <ModalPopup
        show={exportProxyPopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setExportProxyPopup({ isOpen: false });
        }}
        //onAnimationHideStart={() => popupHide(true)}
      >
        <TemplateModal background={<AccountPopupsBg />}>
          <ExportForm />
        </TemplateModal>
      </ModalPopup>

      {/* Proxy continue popup */}
      <ModalPopup
        width='410px'
        show={continueProxyPopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setContinueProxyPopup({ isOpen: false });
        }}
        //onAnimationHideStart={() => popupHide(true)}
      >
        <TemplateModal background={<AccountPopupsBg />}>
          <ContinueForm />
        </TemplateModal>
      </ModalPopup>

      {/* successMessagePopup  */}
      <ModalPopup
        show={successMessagePopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setSuccessMessagePopup({ isOpen: false });
        }}>
        <TemplateModal
          type='message'
          background={<FormsBg />}
          icon={<Icon icon='circle-ok' color='green' size='28' />}>
          <div
            className='AuthPopup-response-message'
            dangerouslySetInnerHTML={{ __html: successMessagePopup.message || '' }}
          />
        </TemplateModal>
      </ModalPopup>

      {/* Error popup */}
      <ModalPopup
        show={errorMessagePopup.isOpen}
        withBackdrop={false}
        onClose={() => {
          setErrorMessagePopup({ isOpen: false });
        }}>
        <TemplateModal
          type='message'
          color='yellow'
          className='TemplateModal-message'
          title={pageInterfaceText?.error_title}
          icon={<Icon icon='info' />}
          background={<Background particleColor='yellow' particleCount='few' color='white' />}>
          <div
            className='AuthPopup-response-message'
            dangerouslySetInnerHTML={{ __html: errorMessagePopup.message || '' }}
          />
        </TemplateModal>
      </ModalPopup>
    </>
  );
});
