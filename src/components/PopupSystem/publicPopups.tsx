import { useCommon } from '@/context/CommonContext';
import { useInterfaceText } from '@/context/UserContext';
import { FC } from 'react';
import { ForgotPassword } from '../Forms/ForgotPassword';
import { LoginForm } from '../Forms/LoginForm';
import { RegisterForm } from '../Forms/RegisterForm';
import { Background } from '../shared/Background';
import { FormsBg } from '../shared/Background/FormsBg';
import { Icon } from '../shared/Icon/Icon';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';

export const PublicPopups: FC = () => {
  const {
    isRegistrationPopupOpen,
    isLoginPopupOpen,
    isForgotPassPopupOpen,
    closeRegistration,
    closeLogin,
    closeForgotPass,
    isPopupHide,
    popupHide,
    error
  } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();

  const {
    newPassSendedMessagePopup,
    setNewPassSendedMessagePopup,

    errorMessagePopup,
    setErrorMessagePopup,

    confirmEmailSendedMessagePopup,
    setConfirmEmailSendedMessagePopup,
  } = usePublicPopups((state) => state);

  return (
    <>
      {/* Registration popup */}
      <ModalPopup
        show={isRegistrationPopupOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={closeRegistration}
        onAnimationHideStart={popupHide}>
        <TemplateModal background={<FormsBg />}>
          <RegisterForm />
        </TemplateModal>
      </ModalPopup>

      {/* Login popup */}
      <ModalPopup
        show={isLoginPopupOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={closeLogin}
        onAnimationHideStart={popupHide}>
        <TemplateModal background={<FormsBg />}>
          <LoginForm />
        </TemplateModal>
      </ModalPopup>

      {/* Forgot pass popup */}
      <ModalPopup
        show={isForgotPassPopupOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={closeForgotPass}
        onAnimationHideStart={popupHide}>
        <TemplateModal background={<FormsBg />}>
          <ForgotPassword />
        </TemplateModal>
      </ModalPopup>

      {/* confirmEmailSendedMessagePopup  */}
      <ModalPopup
        show={confirmEmailSendedMessagePopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setConfirmEmailSendedMessagePopup({ isOpen: false });
        }}
        onAnimationHideStart={popupHide}>
        <TemplateModal
          type='message'
          background={<FormsBg />}
          icon={<Icon icon='circle-ok' color='green' size='28' />}>
          <div
            className='AuthPopup-response-message'
            dangerouslySetInnerHTML={{ __html: confirmEmailSendedMessagePopup.message || '' }}
          />
        </TemplateModal>
      </ModalPopup>

      {/* newPassSendedMessagePopup  */}
      <ModalPopup
        show={newPassSendedMessagePopup.isOpen}
        hide={isPopupHide}
        withBackdrop={false}
        onClose={() => {
          setNewPassSendedMessagePopup({ isOpen: false });
        }}
        onAnimationHideStart={popupHide}>
        <TemplateModal
          type='message'
          background={<FormsBg />}
          icon={<Icon icon='circle-ok' color='green' size='28' />}>
          <div
            className='AuthPopup-response-message'
            dangerouslySetInnerHTML={{ __html: newPassSendedMessagePopup.message || '' }}
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
};
