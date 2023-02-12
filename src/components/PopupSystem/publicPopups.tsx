import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';
import { ForgotPassword } from '../Forms/ForgotPassword';
import { LoginForm } from '../Forms/LoginForm';
import { RegisterForm } from '../Forms/RegisterForm';
import { Background } from '../shared/Background';
import { FormsBg } from '../shared/Background/FormsBg';
import { Icon } from '../shared/Icon/Icon';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';

export const PublicPopups: FC = () => {
	const {
		pageInterfaceText,
		isRegistrationPopupOpen,
		isErrorPopupOpen,
		isLoginPopupOpen,
		isForgotPassPopupOpen,
		closeRegistration,
		closeLogin,
		closeForgotPass,
		isPopupHide,
		popupHide,
		closeError,
		error
	} = useCommon();

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

			{/* Error popup */}
			<ModalPopup show={isErrorPopupOpen} withBackdrop={false} onClose={closeError}>
				<TemplateModal
					color='yellow'
					className='TemplateModal-message'
					title={pageInterfaceText?.error_title}
					subTitle={error?.text}
					icon={<Icon icon='info' />}
					background={<Background particleColor='yellow' particleCount='few' color='white' />}
				/>
			</ModalPopup>
		</>
	);
};
