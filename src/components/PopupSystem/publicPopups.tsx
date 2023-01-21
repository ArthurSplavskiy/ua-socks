import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';
import { LoginForm } from '../Forms/LoginForm';
import { RegisterForm } from '../Forms/RegisterForm';
import { Background } from '../shared/Background';
import { Icon } from '../shared/Icon/Icon';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';

export const PublicPopups: FC = () => {
	const {
		pageInterfaceText,
		isRegistrationPopupOpen,
		isErrorPopupOpen,
		isLoginPopupOpen,
		closeRegistration,
		closeLogin,
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
				<TemplateModal background={<Background color='white' />}>
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
				<TemplateModal background={<Background color='white' />}>
					<LoginForm />
				</TemplateModal>
			</ModalPopup>

			{/* Error popup */}
			<ModalPopup show={isErrorPopupOpen} withBackdrop={false} onClose={closeError}>
				<TemplateModal
					color='yellow'
					title={pageInterfaceText?.error_title}
					subTitle={error?.text}
					icon={<Icon icon='info' />}
					background={<Background particleColor='yellow' particleCount='few' color='white' />}
				/>
			</ModalPopup>
		</>
	);
};
